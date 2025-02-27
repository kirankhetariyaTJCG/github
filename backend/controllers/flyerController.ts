// Core and Third-Party Libraries
import { Request, Response, NextFunction } from 'express';

// Middleware
import { catchAsyncErrors } from '@Middleware/catchAsyncErrors';

// Models
import Flyer from '@Models/flyerSchema';

// Utils and Helpers
import { createResponse, formatMessage, generateFlyerPDF, generateQRCodePDF, generateQRCodes } from '@Utils/function';
import { uploadFile } from "@Utils/multer";
import { MESSAGES, STATUS_CODES } from '@Utils/constant';

export const manageFlyer = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.body
    const flyerData = { ...req.body };

    let flyer;

    if (id) {
        flyer = await Flyer.findByIdAndUpdate(id, flyerData, { new: true, runValidators: true });
        if (!flyer) throw new Error(MESSAGES.GENERAL_ERROR)
        return res.status(STATUS_CODES.SUCCESS).json(createResponse({
            statusCode: STATUS_CODES.SUCCESS,
            success: true,
            errorCode: null,
            message: formatMessage(MESSAGES.UPDATE, "QR Code"),
            data: flyer,
        }));
    }

    flyer = new Flyer(flyerData);
    await flyer.save();

    return res.status(STATUS_CODES.CREATED).json(createResponse({
        statusCode: STATUS_CODES.CREATED,
        success: true,
        errorCode: null,
        message: formatMessage(MESSAGES.CREATE, "QR Code"),
        data: flyer,
    }));
});

export const flyerList = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { restaurant_id } = req.body;

    const getFlyerData = await Flyer.find({ restaurant_id })

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: getFlyerData,
    }));
});

export const generateQRCode = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id, is_qr_code, is_qr_flyer } = req.body;

    const flyerData = await Flyer.findById(id);

    if (!flyerData) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        });
    }

    if (is_qr_flyer) {

        if (!flyerData?.flyer_pages || flyerData?.flyer_pages.length === 0) {
            return res.status(400).json({ message: "No flyer pages provided" });
        }

        let fileName = `flyer_${id}.pdf`;
        await generateFlyerPDF(flyerData?.flyer_pages, fileName);

        flyerData.pdf_url = `uploads/flyers/${fileName}`
        flyerData.is_qr_flyer = true;

        await flyerData.save();

        return res.status(STATUS_CODES.SUCCESS).json({
            statusCode: STATUS_CODES.SUCCESS,
            success: true,
            message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
            data: flyerData,
        });
    }

    if (is_qr_code) {
        let qrLink = 'https://1roos.com/'
        const qrCodes = await generateQRCodes(flyerData.template_type, flyerData.dine_in_subtype_ranges, qrLink);
        let fileName = `qr_codes_${id}.pdf`
        await generateQRCodePDF(qrCodes, fileName, {
            pageWidth: 200,
            pageHeight: 250,
            qrCodeWidth: 100,
            qrCodeHeight: 100,
        });
        flyerData.qr_code_pdf_url = `uploads/qrCode/${fileName}`
        flyerData.is_qr_code = true;
        await flyerData.save();

        return res.status(STATUS_CODES.SUCCESS).json({
            statusCode: STATUS_CODES.SUCCESS,
            success: true,
            message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
            data: flyerData,
        });
    }

    return res.status(STATUS_CODES.SUCCESS).json({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: flyerData,
    });
});

export const deleteFlyer = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const getFlyerData = await Flyer.findById(id);
    await uploadFile.deleteFile(getFlyerData?.qr_code_pdf_url)
    await Flyer.findByIdAndDelete(id)

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: formatMessage(MESSAGES.DELETE, "QR codes & flyer"),
    }));
});


export const manageFlyerPages = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { flyer_id, page_id, headline, page_number, flyer_color, restaurant_id, is_qr_flyer } = req.body;

    let flyer;

    if (flyer_id) {
        flyer = await Flyer.findById(flyer_id);

        if (!flyer) {
            throw new Error(MESSAGES.GENERAL_ERROR)
        }

        if (page_id) {
            const pageIndex = flyer.flyer_pages.findIndex((page: any) => page._id.toString() === page_id);
            if (pageIndex === -1) {
                throw new Error(MESSAGES.GENERAL_ERROR)
            }

            if (req.file && req.file.path) {
                const oldImage = flyer.flyer_pages[pageIndex].image;
                if (oldImage) {
                    uploadFile.deleteFile(oldImage);
                }
                flyer.flyer_pages[pageIndex].image = req.file.path;
            }

            flyer.flyer_pages[pageIndex].headline = headline || flyer.flyer_pages[pageIndex].headline;
            flyer.flyer_pages[pageIndex].page_number = page_number || flyer.flyer_pages[pageIndex].page_number;
            flyer.flyer_pages[pageIndex].flyer_color = flyer_color || flyer.flyer_pages[pageIndex].flyer_color;
            flyer.is_qr_flyer = is_qr_flyer;
        }
        else {
            const newPage: any = {
                headline,
                page_number,
                flyer_color,
                image: req.file ? req.file.path : null
            };
            flyer.flyer_pages.push(newPage);
            flyer.is_qr_flyer = is_qr_flyer;
        }

        await flyer.save();
        return res.status(STATUS_CODES.SUCCESS).json({
            statusCode: STATUS_CODES.SUCCESS,
            success: true,
            message: MESSAGES.DATA_SAVED_SUCCESSFULLY,
            data: flyer,
        });
    }

    const newFlyer = new Flyer({
        flyer_pages: [{
            headline,
            page_number,
            flyer_color,
            image: req.file ? req.file.path : null
        }],
        restaurant_id: restaurant_id,
    });

    await newFlyer.save();
    return res.status(STATUS_CODES.CREATED).json({
        statusCode: STATUS_CODES.CREATED,
        success: true,
        message: MESSAGES.DATA_SAVED_SUCCESSFULLY,
        data: newFlyer,
    });
});