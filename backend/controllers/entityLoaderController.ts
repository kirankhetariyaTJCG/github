// Core and Third-Party Libraries
import { Request, Response, NextFunction } from 'express';

// Middleware
import { catchAsyncErrors } from '@Middleware/catchAsyncErrors';

// Models
import User from '@Models/userSchema';
import Restaurant from '@Models/restaurantSchema';
import RestaurantHours from '@Models/restaurantHoursSchema';
import TaxRates from '@Models/taxRateSchema';
import DeliveryZone from '@Models/deliveryZoneSchema';
import Cuisine from '@Models/cuisineSchema';
import Addon from '@Models/addonSchema';
import Choice from '@Models/choiceSchema';
import Category from '@Models/categorySchema';
import Item from '@Models/menuItemSchema';
import sizeSchema from '@Models/sizeSchema';
import Menu from '@Models/menuSchema';

// Utils and Helpers
import { MESSAGES, STATUS_CODES } from '@Utils/constant';
import { createResponse, getRedisData, randomString, storeRedisData } from '@Utils/function';
import { userRequest } from '@Utils/customInterface';

export const loadEntities = catchAsyncErrors(async (req: userRequest, res: Response, next: NextFunction) => {
    const { entities } = req.body;
    const restaurant_id = req.user?.restaurant_id;
    const user_id = req.user?.id;

    const redisData = await getRedisData(restaurant_id?.toString() as string)
    if (redisData) {
        return res.status(STATUS_CODES.SUCCESS).json(createResponse({
            statusCode: STATUS_CODES.SUCCESS,
            success: true,
            message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
            data: redisData
        }));
    }

    const data: any = {};
    const promises: Promise<any>[] = [];

    const entityQueries: any = {
        user: User.find({ is_deleted: false }).exec(),
        restaurant: Restaurant.find({ user_id }).exec(),
        restaurantHours: RestaurantHours.find({ restaurant_id }).exec(),
        taxRates: DeliveryZone.find({ restaurant_id }).exec(),
        deliveryZone: TaxRates.find({ restaurant_id }).exec(),
        cuisine: Cuisine.find({ restaurant_id, is_deleted: false }).exec(),
        addons: Addon.find({ restaurant_id: restaurant_id, is_deleted: false }).sort({ sort_order: 1 }).lean().exec(),
        categories: Category.find({ restaurant_id, is_deleted: false }).sort({ sort_order: 1 }).populate('addons', 'name').exec()
    };

    entities.forEach((entity: any) => {
        if (entityQueries[entity]) {
            promises.push(entityQueries[entity]);
        }
    });

    const results = await Promise.all(promises);

    for (let index = 0; index < results.length; index++) {
        const result = results[index];
        const entity = entities[index];

        if (entityQueries[entity]) {
            if (entity === 'addons') {
                data[entity] = await Promise.all(
                    result.map(async (addon: any) => {
                        const choices = await Choice.find({ addon_id: addon._id, is_deleted: false }).sort({ sort_order: 1 }).lean().exec();
                        return {
                            ...addon,
                            choices,
                        };
                    })
                );
            } else if (entity === 'categories') {
                data[entity] = await Promise.all(
                    result.map(async (category: any) => {
                        const items = await Item.find({ category_id: category._id, is_deleted: false })
                            .sort({ sort_order: 1 })
                            .populate('addons', 'name price');

                        const itemsWithSizes = await Promise.all(
                            items.map(async (item: any) => {
                                const sizes = await sizeSchema.find({ item_id: item._id, is_deleted: false }).sort({ sort_order: 1 }).populate('addons', 'name price');
                                return {
                                    ...item.toObject(),
                                    sizes,
                                };
                            })
                        );

                        return {
                            ...category.toObject(),
                            items: itemsWithSizes,
                        };
                    })
                );
            } else {
                data[entity] = result;
            }
        }
    }

    await storeRedisData(restaurant_id?.toString() as string, data, 600); // Store for 10 minutes
    res.status(STATUS_CODES.SUCCESS).json(createResponse({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: data
    }));
});

export const generateWebsite = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { restaurant_id } = req.body;

        const [restaurant, restaurantHours, taxRates, deliveryZone] = await Promise.all([
            Restaurant.findById(restaurant_id).populate("user_id", "first_name last_name email profile_image"),
            RestaurantHours.find({ restaurant_id }),
            TaxRates.find({ restaurant_id, is_deleted: false }),
            DeliveryZone.find({ restaurant_id }).sort({ createdAt: -1 })
        ]);

        if (!restaurant) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                statusCode: STATUS_CODES.NOT_FOUND,
                message: MESSAGES.NOT_FOUND,
            });
        }

        const response: any = {
            ...restaurant.toObject(),
            user: restaurant.user_id,
            restaurant_hours: restaurantHours ?? [],
            tax_rates: taxRates ?? [],
            delivery_zone: deliveryZone ?? [],
        };

        delete response.user_id;

        const randomKey = await randomString(15);
        await storeRedisData(randomKey.toString(), response, 600); // Store for 10 minutes

        res.status(STATUS_CODES.SUCCESS).json({
            statusCode: STATUS_CODES.SUCCESS,
            success: true,
            message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
            // data: response,
            data: randomKey,
        });
    } catch (error) {
        console.error(error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
});

export const getWebsite = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { key } = req.params

    const data = await getRedisData(key)

    if (!data) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
            success: false,
            statusCode: STATUS_CODES.NOT_FOUND,
            message: MESSAGES.NOT_FOUND,
        });
    }

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: data,
    });

})

export const dropdownData = catchAsyncErrors(async (req: userRequest, res: Response, next: NextFunction) => {
    const { type, menu_id } = req.body
    const userID = req?.user?.id

    let data
    if (type == 1) {
        data = await Restaurant.find({ user_id: userID }, { name: 1 })
    } else if (type == 2) {
        data = await Menu.find({ user_id: userID }, { name: 1 })
    } else if (type == 3) {
        data = await Category.find({ menu_id }, { name: 1 })
    }


    res.status(STATUS_CODES.SUCCESS).json({
        statusCode: STATUS_CODES.SUCCESS,
        success: true,
        message: MESSAGES.DATA_RETRIEVED_SUCCESSFULLY,
        data: data,
    });

})