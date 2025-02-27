// Core and Third-Party Libraries
import { Request, Response, NextFunction } from 'express';

// Middleware
import { catchAsyncErrors } from '@Middleware/catchAsyncErrors';

// Models
import Addon from '@Models/addonSchema';
import Choice from '@Models/choiceSchema';
import Category from '@Models/categorySchema';
import Item from '@Models/menuItemSchema';
import Size from '@Models/sizeSchema';
import Allergens from '@Models/allergensSchema';
import Menu from '@Models/menuSchema';
import ItemsExtraDetail from '@Models/itemsExtraDetailSchema';
import NutritionalValues from '@Models/nutritionalValuesSchema';
import Promotion from '@Models/promotionSchema';

// Utils and Helpers
import { categoriesWithAllDetails, createResponse, duplicateDocument, duplicateRelatedEntities, formatMessage, mealMeData } from '@Utils/function';
import { uploadFile } from '@Utils/multer';
import { MESSAGES, STATUS_CODES } from '@Utils/constant';
import { userRequest } from '@Utils/customInterface';

/***************************************** Addons ********************************************************/

export const addAddon = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { name, is_optional, allow_quantity, force_min, force_max, menu_id } = req.body;

    const maxSortOrder = await Addon.findOne({ menu_id })
        .sort({ sort_order: -1 })
        .select('sort_order');

    const newSortOrder = maxSortOrder ? maxSortOrder.sort_order + 1 : 1;
    const newAddon = await Addon.create({
        menu_id,
        name,
        is_optional,
        allow_quantity,
        force_min,
        force_max,
        is_deleted: false,
        sort_order: newSortOrder,
    });

    res.status(STATUS_CODES.CREATED).json({
        statusCode: STATUS_CODES.CREATED,
        success: true,
        message: formatMessage(MESSAGES.CREATE, "Addon"),
        data: { ...newAddon?.toObject(), choices: [] },
    });
});

export const editAddon = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    const { id, menu_id, name, is_optional, allow_quantity, force_min, force_max, tax_category_id } = req.body;

    const updatedAddon = await Addon.findOneAndUpdate(
        { _id: id, is_deleted: false },
        { menu_id, name, is_optional, allow_quantity, force_min, force_max, tax_category_id },
        { new: true, runValidators: true }
    );

    if (!updatedAddon) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success: false,
            message: MESSAGES.NOT_FOUND,
        });
    }

    let updatedResponse = await updatedAddon.populate('tax_category_id')

    res.status(200).json({
        statusCode: 200,
        success: true,
        message: formatMessage(MESSAGES.UPDATE, "Addon"),
        data: updatedResponse,
    });
});

export const deleteAddon = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const existingInCategory = await Category.find({ is_deleted: false, addons: { $in: id } });
    const existingInItem = await Item.find({ is_deleted: false, addons: { $in: id } });
    const existingInSize = await Size.find({ is_deleted: false, addons: { $in: id } });

    if (existingInCategory?.length > 0 || existingInItem?.length > 0 || existingInSize?.length > 0) {
        return res.status(STATUS_CODES.CONFLICT).json(createResponse({
            statusCode: STATUS_CODES.CONFLICT,
            success: false,
            message: MESSAGES.ASSOCIATE_RECORD_NOT_DELETED,
        }));
    }

    const deletedAddon = await Addon.findOneAndUpdate(
        { _id: id },
        { is_deleted: true },
        { new: true }
    );

    if (!deletedAddon) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        });
    }

    res.status(200).json({
        statusCode: 200,
        success: true,
        message: formatMessage(MESSAGES.DELETE, "Addon"),
    });
});

export const getAllAddons = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { menu_id } = req.body;

    const addons = await Addon.find({ menu_id, is_deleted: false }).populate('tax_category_id').sort({ sort_order: 1 });

    const addonWithChoices = await Promise.all(
        addons.map(async (addon) => {
            const choices = await Choice.find({ addon_id: addon._id, is_deleted: false }).sort({ sort_order: 1 })
            return {
                ...addon.toObject(),
                choices,
            };
        })
    );

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: addonWithChoices,
    });
});

export const changeAddonPosition = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { addonIds, menu_id } = req.body;

    for (let index = 0; index < addonIds.length; index++) {
        const addon_id = addonIds[index];
        await Addon.updateOne(
            { _id: addon_id, menu_id },
            { sort_order: index + 1 }
        );
    }

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.POSITION_CHANGE_SUCCESS,
    });
});

/***************************************** Choices ********************************************************/

export const addChoice = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { addon_id, name, price, is_pre_selected } = req.body;

    const addonExists = await Addon.findById(addon_id);
    if (!addonExists) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    const maxSortOrder = await Choice.findOne({ addon_id })
        .sort({ sort_order: -1 })
        .select('sort_order');

    const newSortOrder = maxSortOrder ? maxSortOrder.sort_order + 1 : 1;
    const newChoice = await Choice.create({
        addon_id,
        name,
        price,
        is_pre_selected,
        sort_order: newSortOrder
    });

    res.status(STATUS_CODES.CREATED).json(createResponse({
        statusCode: STATUS_CODES.CREATED,
        success: true,
        errorCode: null,
        message: formatMessage(MESSAGES.CREATE, "Choice"),
        data: newChoice,
    }));
});

export const editChoice = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id, addon_id, name, price, is_pre_selected, out_of_stock, out_of_stock_next_day, out_of_stock_until, menu_item_kitchen_internal_name } = req.body;

    const choice = await Choice.findOne({ _id: id, is_deleted: false });

    if (!choice) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    const updatedChoice = await Choice.findByIdAndUpdate(
        id,
        { addon_id, name, price, is_pre_selected, out_of_stock, out_of_stock_next_day, out_of_stock_until, menu_item_kitchen_internal_name },
        { new: true, runValidators: true }
    );

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: formatMessage(MESSAGES.UPDATE, "Choice"),
        data: updatedChoice,
    }));
});

export const deleteChoice = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const deletedChoice = await Choice.findOneAndUpdate(
        { _id: id },
        { is_deleted: true },
        { new: true }
    );

    if (!deletedChoice) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: formatMessage(MESSAGES.DELETE, "Choice"),
    }));
});

export const changeChoicePosition = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { choiceOrderedId, addon_id } = req.body;

    for (let index = 0; index < choiceOrderedId.length; index++) {
        const choice_id = choiceOrderedId[index];
        await Choice.updateOne(
            { _id: choice_id, addon_id },
            { sort_order: index + 1 }
        );
    }

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.POSITION_CHANGE_SUCCESS,
    });
});

/***************************************** Category ********************************************************/

export const addCategory = catchAsyncErrors(async (req: userRequest, res: Response, next: NextFunction) => {
    const { name, description, addons, menu_id } = req.body;
    const image = req.file ? req.file.path : null;
    const user_id = req?.user?.id

    const maxSortOrder = await Category.findOne({ menu_id })
        .sort({ sort_order: -1 })
        .select('sort_order');

    const newSortOrder = maxSortOrder ? maxSortOrder.sort_order + 1 : 1;

    const newCategory: any = await Category.create({
        name,
        description,
        image,
        addons,
        menu_id,
        user_id: user_id,
        sort_order: newSortOrder
    });

    const responseData = await newCategory.populate("addons")

    res.status(STATUS_CODES.CREATED).json(createResponse({
        statusCode: STATUS_CODES.CREATED,
        success: true,
        errorCode: null,
        message: formatMessage(MESSAGES.CREATE, "Category"),
        data: { ...responseData.toObject(), items: [] },
    }));
});

export const editCategory = catchAsyncErrors(async (req: userRequest, res: Response, next: NextFunction) => {
    const { id, menu_id, name, description, addons } = req.body;
    const newImagePath = req.file ? req.file.path : undefined;
    const user_id = req?.user?.id

    const category = await Category.findOne({ _id: id, menu_id });

    if (!category) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    if (newImagePath && category?.image) {
        await uploadFile.deleteFile(category.image);
    }

    const updatedCategory: any = await Category.findByIdAndUpdate(
        id,
        {
            name,
            description,
            image: newImagePath || category.image,
            addons,
            user_id: user_id
        },
        { new: true, runValidators: true }
    )

    if (!updatedCategory) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(createResponse({
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            success: false,
            message: MESSAGES.INTERNAL_SERVER_ERROR,
        }));
    }

    const populatedIData = await updatedCategory.populate('addons', "_id name")

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: formatMessage(MESSAGES.UPDATE, "Category"),
        data: populatedIData,
    }));
});

export const deleteCategory = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const existingInMenu = await Menu.find({ is_deleted: false, category_id: id });
    if (existingInMenu && existingInMenu?.length > 0) {
        return res.status(STATUS_CODES.CONFLICT).json(createResponse({
            statusCode: STATUS_CODES.CONFLICT,
            success: false,
            message: MESSAGES.ASSOCIATE_RECORD_NOT_DELETED,
        }));
    }

    const category = await Category.findOneAndUpdate(
        { _id: id },
        { is_deleted: true },
        { new: true }
    );

    if (!category) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    await uploadFile.deleteFile(category.image);
    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: formatMessage(MESSAGES.DELETE, "Category"),
        data: { id: category._id, name: category.name }
    }));
});

export const getAllCategories = catchAsyncErrors(async (req: userRequest, res: Response, next: NextFunction) => {
    const { menu_id } = req.body;

    const categories = await Category.find({ menu_id, is_deleted: false }).sort({ sort_order: 1 })
        .populate('addons', 'name');

    const categoriesWithItems = await Promise.all(categories.map(async (category) => {
        const items = await Item.find({ category_id: category._id, is_deleted: false })
            .sort({ sort_order: 1 })
            .populate('addons', 'name price')
            .populate('tax_category_id')
            .populate({
                path: 'items_extra_detail_id',
                select: 'name type',
                match: { is_deleted: false }
            });

        const itemsWithSizes = await Promise.all(
            items.map(async (item) => {
                const sizes = await Size.find({ item_id: item._id, is_deleted: false })
                    .sort({ sort_order: 1 })
                    .populate('addons', 'name price')
                // .populate({
                //     path: 'nutritional_values.items_extra_detail_id',
                //     select: 'name type',
                //     match: { is_deleted: false },
                //     options: { strictPopulate: false }
                // });
                // console.log("sizes", sizes)
                return {
                    ...item.toObject(),
                    sizes: sizes,
                };
            })
        );

        return {
            ...category.toObject(),
            items: itemsWithSizes,
        };
    }));

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: categoriesWithItems,
    }));
});

export const changeCategoryPosition = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { categoryIds, menu_id } = req.body;

    for (let index = 0; index < categoryIds.length; index++) {
        const category_id = categoryIds[index];
        await Category.updateOne(
            { _id: category_id, menu_id },
            { sort_order: index + 1 }
        );
    }

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.POSITION_CHANGE_SUCCESS,
    }));
});

/***************************************** Items ********************************************************/

export const addItem = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { category_id, name, description, price, is_variant, addons } = req.body;
    const image = req.file ? req.file.path : null;


    const item = await Item.create({
        category_id,
        image,
        name,
        description,
        price,
        is_variant,
        addons,
    });

    const itemData = await item.populate('addons');

    res.status(STATUS_CODES.CREATED).json(createResponse({
        statusCode: STATUS_CODES.CREATED,
        success: true,
        message: formatMessage(MESSAGES.CREATE, "Item"),
        data: itemData,
    }));
});

export const editItem = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id, category_id, name, description, price, is_variant, addons, nutritional_values, nutritional_values_size } = req.body;
    const newImagePath = req.file ? req.file.path : undefined;

    const existingItem = await Item.findById(id);

    if (!existingItem) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
            data: null,
        }));
    }

    if (newImagePath && existingItem.image) {
        uploadFile.deleteFile(existingItem.image);
    }

    const updateFields: any = {
        category_id,
        name,
        description,
        price,
        is_variant,
        addons,
        image: newImagePath || existingItem.image,
        nutritional_values,
        nutritional_values_size
    };

    const updatedItem: any = await Item.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

    const itemData = await updatedItem.populate('addons');

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: formatMessage(MESSAGES.UPDATE, "Item"),
        data: itemData,
    }));
});

export const manageItem = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const newImagePath = req.file ? req.file.path : undefined;

    let itemData: any;
    const updateData: any = { ...req.body };

    if (id) {
        const existingItem = await Item.findById(id);
        if (!existingItem) {
            return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
                statusCode: STATUS_CODES.NOT_FOUND,
                success: false,
                message: MESSAGES.NOT_FOUND,
                data: null,
            }));
        }
        if (newImagePath) {
            if (existingItem?.image) {
                await uploadFile.deleteFile(existingItem.image);
            }
            updateData['image'] = newImagePath;
        } else {
            updateData['image'] = existingItem?.image;
        }

        itemData = await Item.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    } else {
        itemData = await Item.create({
            ...req.body,
            image: newImagePath,
        });
    }

    const populatedItemData = await itemData.populate('addons tags')

    res.status(id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED).json(createResponse({
        statusCode: id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED,
        success: true,
        message: formatMessage(id ? MESSAGES.UPDATE : MESSAGES.CREATE, "Item"),
        data: populatedItemData,
    }));
});

export const deleteItem = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    // const existingInMenu = await Size.find({ is_deleted: false, item_id: id });
    // if (existingInMenu && existingInMenu?.length > 0) {
    //     return res.status(STATUS_CODES.CONFLICT).json(createResponse({
    //         statusCode: STATUS_CODES.CONFLICT,
    //         success: false,
    //         message: MESSAGES.ASSOCIATE_RECORD_NOT_DELETED,
    //     }));
    // }

    const item = await Item.findByIdAndUpdate(id, { is_deleted: true }, { new: true });

    if (!item) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: formatMessage(MESSAGES.DELETE, "Item"),
    }));
});


export const changeItemPosition = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { itemIdsArray, category_id } = req.body;

    for (let index = 0; index < itemIdsArray.length; index++) {
        const item_id = itemIdsArray[index];
        await Item.updateOne(
            { _id: item_id, category_id },
            { sort_order: index + 1 }
        );
    }

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.POSITION_CHANGE_SUCCESS,
    }));
});

/***************************************** Sizes ********************************************************/

export const addSize = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { item_id, name, price, is_pre_select, addons, nutritional_values, nutritional_values_size } = req.body;

    if (is_pre_select) {
        await Size.updateMany({ item_id }, { is_pre_select: false });
    }

    const size = await Size.create({
        item_id,
        name,
        price,
        is_pre_select,
        addons,
        nutritional_values,
        nutritional_values_size
    });

    let responseData = await size.populate("addons")

    res.status(STATUS_CODES.CREATED).json(createResponse({
        statusCode: STATUS_CODES.CREATED,
        success: true,
        message: formatMessage(MESSAGES.CREATE, "Size"),
        data: responseData,
    }));
});

export const editSize = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    const { id, item_id, name, price, is_pre_select, addons, nutritional_values, nutritional_values_size } = req.body;

    if (is_pre_select) {
        await Size.updateMany({ item_id, _id: { $ne: id } }, { is_pre_select: false });
    }

    const size = await Size.findByIdAndUpdate(id, {
        name,
        price,
        is_pre_select,
        addons,
        nutritional_values,
        nutritional_values_size
    }, { new: true, runValidators: false });

    if (!size) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
            data: null,
        }));
    }

    let responseData = await size.populate("addons")

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: formatMessage(MESSAGES.UPDATE, "Size"),
        data: responseData,
    }));
});

export const deleteSize = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const size = await Size.findByIdAndUpdate(id, { is_deleted: true }, { new: true });

    if (!size) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
            data: null,
        }));
    }

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: formatMessage(MESSAGES.DELETE, "Size"),
    }));
});

// menu
export const addOrEditMenu = catchAsyncErrors(async (req: userRequest, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const userID = req.user?.id;
    let menu;

    const updateData: any = { ...req.body };
    updateData['user_id'] = userID

    if (id) {
        menu = await Menu.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    } else {
        menu = await Menu.create(updateData);
    }

    const action = id ? MESSAGES.UPDATE : MESSAGES.CREATE;

    res.status(id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED).json(createResponse({
        statusCode: id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED,
        success: true,
        errorCode: null,
        message: formatMessage(action, "Menu"),
        data: menu,
    }));
});

export const getMenuData = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { restaurant_id } = req.body;

    const menuData = await Menu.find({ restaurant_id, is_deleted: false });

    const menusWithCategories = await Promise.all(menuData.map(async (menu) => {
        const categoryIds = menuData.map(menu => menu.category_id).flat();
        const categories = await Category.find({ _id: { $in: categoryIds } })
            .sort({ sort_order: 1 })
            .populate('addons', 'name');

        const categoriesWithItems = await Promise.all(categories.map(async (category) => {
            const items = await Item.find({ category_id: category._id, is_deleted: false })
                .sort({ sort_order: 1 })
                .populate({
                    path: 'items_extra_detail_id',
                    select: 'name type',
                    match: { is_deleted: false }
                })
                .populate('addons', 'name price')
                .populate('tags', 'tag_name icon_image')


            const itemsWithSizes = await Promise.all(
                items.map(async (item) => {
                    const sizes = await Size.find({ item_id: item._id, is_deleted: false })
                        .sort({ sort_order: 1 })
                        .populate('addons', 'name price')
                    return {
                        ...item.toObject(),
                        sizes: sizes,
                    };
                })
            );

            return {
                ...category.toObject(),
                items: itemsWithSizes,
            };
        }));

        return {
            ...menu.toObject(),
            categories: categoriesWithItems,
        };
    }));

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: menusWithCategories,
    }));
});

export const updateMenuStatus = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id, isDeleted, is_active } = req.body;

    if (isDeleted) {
        const existingInCategory = await Category.find({ is_deleted: false, menu_id: id });
        const existingInAddon = await Addon.find({ is_deleted: false, menu_id: id });

        if (existingInCategory?.length > 0 || existingInAddon?.length > 0) {
            return res.status(STATUS_CODES.CONFLICT).json(createResponse({
                statusCode: STATUS_CODES.CONFLICT,
                success: false,
                message: MESSAGES.ASSOCIATE_RECORD_NOT_DELETED,
            }));
        }
    }

    const updatedTag = await Menu.findByIdAndUpdate(id, { is_deleted: isDeleted, is_active })

    if (!updatedTag) {
        throw new Error(MESSAGES.GENERAL_ERROR)
    }

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: isDeleted ? formatMessage(MESSAGES.DELETE, "Menu") : MESSAGES.STATUS_CHANGE_SUCCESS,
    }));
});

// Allergens
export const manageAllergens = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    let allergens;

    const updateData: any = { ...req.body };

    if (id) {
        allergens = await Allergens.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    } else {
        allergens = await Allergens.create(updateData);
    }

    if (!allergens) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    const action = id ? MESSAGES.UPDATE : MESSAGES.CREATE;

    res.status(id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED).json(createResponse({
        statusCode: id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED,
        success: true,
        errorCode: null,
        message: formatMessage(action, "Allergens"),
        data: allergens,
    }));
});

export const getAllergens = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { menu_id, restaurant_id } = req.body;

    let filter: any = {
        is_deleted: false
    }

    if (menu_id) filter['menu_id'] = menu_id;
    if (restaurant_id) filter['restaurant_id'] = restaurant_id;

    const allergensData = await Allergens.find(filter);

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: allergensData,
    }));
});

export const deleteAllergens = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const allergens = await Allergens.findByIdAndUpdate(id, { is_deleted: true });

    if (!allergens) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: formatMessage(MESSAGES.DELETE, "Allergens"),
    }));
});

export const manageVisibility = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id, type, ...updateData } = req.body;

    let Model: any;
    if (type === 1) {
        Model = Category;
    } else if (type === 2) {
        Model = Item;
    } else {
        return res.status(STATUS_CODES.BAD_REQUEST).json(createResponse({
            statusCode: STATUS_CODES.BAD_REQUEST,
            success: false,
            message: MESSAGES.BAD_REQUEST,
        }));
    }

    const updated = await Model.findOneAndUpdate({ _id: id }, updateData, { new: true }).populate("addons");

    if (!updated) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: formatMessage(MESSAGES.UPDATE, "Visibility settings"),
        data: updated,
    }));
});

export const duplicateEntity = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id, type } = req.body;

    const entityMap: any = {
        1: { model: Category, relatedModel: Item, foreignKey: 'category_id' },
        2: { model: Item, relatedModel: Size, foreignKey: 'item_id' },
        3: { model: Addon, relatedModel: Choice, foreignKey: 'addon_id' },
        4: { model: Choice },
        5: { model: Promotion },
    };

    let subArrayKey = type === 3 ? "choices" : "items"

    const entityData = entityMap[type];
    if (!entityData) {
        return res.status(STATUS_CODES.BAD_REQUEST).json(createResponse({
            statusCode: STATUS_CODES.BAD_REQUEST,
            success: false,
            message: MESSAGES.BAD_REQUEST,
        }));
    }

    const { model: Model, relatedModel, foreignKey } = entityData;
    const originalEntity = await Model.findById(id);
    if (!originalEntity) {
        return res.status(404).json(createResponse({
            statusCode: 404,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    const newEntity = await duplicateDocument(originalEntity, Model);
    const duplicatedData: any = { ...newEntity.toObject() };

    if (relatedModel) {
        duplicatedData[subArrayKey] = await duplicateRelatedEntities(originalEntity, newEntity, relatedModel, foreignKey, type);
    }

    res.status(200).json(createResponse({
        statusCode: 200,
        success: true,
        message: MESSAGES.DATA_SAVED_SUCCESSFULLY,
        data: duplicatedData
    }));
});

export const manageItemsExtraDetail = catchAsyncErrors(async (req: userRequest, res: Response, next: NextFunction) => {
    const { id } = req.body;
    let itemsExtraDetail;

    const updateData: any = { ...req.body };

    if (id) {
        itemsExtraDetail = await ItemsExtraDetail.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    } else {
        itemsExtraDetail = await ItemsExtraDetail.create(updateData);
    }

    if (!itemsExtraDetail) {
        return res.status(STATUS_CODES.NOT_FOUND).json(createResponse({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        }));
    }

    const action = id ? MESSAGES.UPDATE : MESSAGES.CREATE;

    res.status(id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED).json(createResponse({
        statusCode: id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED,
        success: true,
        errorCode: null,
        message: formatMessage(action, "data"),
        data: itemsExtraDetail,
    }));
});

export const deleteItemsExtraDetail = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const deletedAddon = await ItemsExtraDetail.findOneAndUpdate(
        { _id: id },
        { is_deleted: true },
        { new: true }
    );

    if (!deletedAddon) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        });
    }

    res.status(200).json({
        statusCode: 200,
        success: true,
        message: formatMessage(MESSAGES.DELETE, "Addon"),
    });
});

export const getAllItemsExtraDetail = catchAsyncErrors(async (req: userRequest, res: Response, next: NextFunction) => {
    const { menu_id, type } = req.body;

    const itemsExtraDetail = await ItemsExtraDetail.find({ menu_id, type, is_deleted: false });

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: itemsExtraDetail,
    });
});


export const userCreatedMenu = catchAsyncErrors(async (req: userRequest, res: Response, next: NextFunction) => {
    const user_id = req?.user?.id;

    const menuName = await Menu.find({ is_deleted: false, user_id });

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: menuName,
    });
});

// export const getMenuDetails = catchAsyncErrors(async (req: userRequest, res: Response, next: NextFunction) => {
//     const { menu_id } = req.body;

//     // Fetch all categories for the menu
//     const categories = await Category.find({ menu_id, is_deleted: false }).sort({ sort_order: 1 });

//     // Process each category
//     const categoriesWithDetails = await Promise.all(categories.map(async (category) => {
//         // Fetch addons and their choices for the category
//         const addons = await Addon.find({ _id: { $in: category.addons }, is_deleted: false });
//         const addonsWithChoices = await Promise.all(addons.map(async (addon) => {
//             const choices = await Choice.find({ addon_id: addon._id, is_deleted: false });
//             return {
//                 ...addon.toObject(),
//                 choices,
//             };
//         }));

//         // Fetch items for the category
//         const items = await Item.find({ category_id: category._id, is_deleted: false })
//             .sort({ sort_order: 1 })
//             .populate('tax_category_id')
//             .populate({
//                 path: 'items_extra_detail_id',
//                 select: 'name type',
//                 match: { is_deleted: false },
//             })
//             .populate('tags', 'tag_name icon_image');

//         // Process each item
//         const itemsWithDetails = await Promise.all(items.map(async (item) => {
//             // Fetch addons and their choices for the item
//             const itemAddons = await Addon.find({ _id: { $in: item.addons }, is_deleted: false });
//             const itemAddonsWithChoices = await Promise.all(itemAddons.map(async (addon) => {
//                 const choices = await Choice.find({ addon_id: addon._id, is_deleted: false });
//                 return {
//                     ...addon.toObject(),
//                     choices,
//                 };
//             }));

//             // Fetch sizes and their addons with choices
//             const sizes = await Size.find({ item_id: item._id, is_deleted: false }).sort({ sort_order: 1 });
//             const sizesWithDetails = await Promise.all(sizes.map(async (size) => {
//                 const sizeAddons = await Addon.find({ _id: { $in: size.addons }, is_deleted: false });
//                 const sizeAddonsWithChoices = await Promise.all(sizeAddons.map(async (addon) => {
//                     const choices = await Choice.find({ addon_id: addon._id, is_deleted: false });
//                     return {
//                         ...addon.toObject(),
//                         choices,
//                     };
//                 }));

//                 return {
//                     ...size.toObject(),
//                     addons: sizeAddonsWithChoices,
//                 };
//             }));

//             return {
//                 ...item.toObject(),
//                 addons: itemAddonsWithChoices,
//                 sizes: sizesWithDetails,
//             };
//         }));

//         return {
//             ...category.toObject(),
//             addons: addonsWithChoices,
//             items: itemsWithDetails,
//         };
//     }));

//     res.status(STATUS_CODES.SUCCESS).json(createResponse({
//         statusCode: STATUS_CODES.SUCCESS,
//         success: true,
//         errorCode: null,
//         message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
//         data: categoriesWithDetails,
//     }));
// });


export const getMenuDetails = catchAsyncErrors(async (req: userRequest, res: Response, next: NextFunction) => {
    const { menu_id } = req.body;

    if (!menu_id) {
        return res.status(400).json(createResponse({
            statusCode: 400,
            success: false,
            errorCode: 'MENU_ID_REQUIRED',
            message: 'Menu ID is required',
            data: null,
        }));
    }

    const detailedCategories = await categoriesWithAllDetails(menu_id);

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: detailedCategories,
    }));
});

export const saveNutritionalValues = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id, size_id, item_id, extras, nutritional_values_size, is_deleted } = req.body;

    const updateData: any = {
        size_id,
        item_id,
        nutritional_values_size,
        extras,
    }
    let nutritional;
    if (id) {
        nutritional = await NutritionalValues.findByIdAndUpdate(id, updateData,
            { new: true, runValidators: true });
    } else {
        nutritional = await NutritionalValues.create(updateData);
    }

    const action = id ? MESSAGES.UPDATE : MESSAGES.CREATE;

    res.status(id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED).json(
        createResponse({
            statusCode: id ? STATUS_CODES.SUCCESS : STATUS_CODES.CREATED,
            success: true,
            errorCode: null,
            message: formatMessage(action, "Nutritional values"),
            data: nutritional,
        })
    );

})

export const getNutritionalValues = catchAsyncErrors(async (req: userRequest, res: Response, next: NextFunction) => {
    const { item_id } = req.body;

    const data = await NutritionalValues.find({ item_id, is_deleted: false }).populate('extras.items_extra_detail_id', 'name type is_default')

    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        errorCode: null,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: data,
    }));
});

export const deleteNutritionalValues = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const deletedAddon = await NutritionalValues.findOneAndUpdate(
        { _id: id },
        { is_deleted: true },
        { new: true }
    );

    if (!deletedAddon) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode: STATUS_CODES.NOT_FOUND,
            success: false,
            message: MESSAGES.NOT_FOUND,
        });
    }

    res.status(200).json({
        statusCode: 200,
        success: true,
        message: formatMessage(MESSAGES.DELETE, "Nutritional Values"),
    });
});


export const getstoreMenu = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const data = await mealMeData(id)

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: data,
    });
});