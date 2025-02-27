// Core and Third-Party Libraries
import { Request, Response, NextFunction } from 'express';

// Middleware
import { catchAsyncErrors } from '@Middleware/catchAsyncErrors';

// Models
import Tag from '@Models/tagSchema';

// Utils and Helpers
import { createResponse, formatMessage } from '@Utils/function';
import { MESSAGES, STATUS_CODES } from '@Utils/constant';


export const addOrEditTag = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id, tag_name, icon_image, isDeleted, is_active } = req.body;
    let tagData;

    if (id) {
        tagData = await Tag.findByIdAndUpdate(
            id,
            { tag_name, icon_image, is_active, is_deleted: isDeleted },
            { new: true, }
        );

    } else {
        tagData = await Tag.create({ tag_name, icon_image });
    }

    const action = id ? MESSAGES.UPDATE : MESSAGES.CREATE;

    res.status(id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED).json(createResponse({
        statusCode: id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED,
        success: true,
        errorCode: null,
        message: formatMessage(action, "Tag"),
        data: tagData,
    }));
});


export const tagList = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    const { showActive } = req.body

    const query = { is_deleted: false, ...(showActive ? { is_active: true } : {}) };
    const projection = showActive ? { tag_name: 1, icon_image: 1 } : {};

    const tagData = await Tag.find(query, projection);

    return res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: tagData,
    }));
});