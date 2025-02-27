import Joi from 'joi';

const addAddonSchema = Joi.object({
    restaurant_id: Joi.string().required(),
    name: Joi.string().required(),
    is_optional: Joi.boolean().required(),
    allow_quantity: Joi.boolean().required(),
    force_min: Joi.number().integer().required(),
    force_max: Joi.number().integer().required(),
});

const editAddonSchema = Joi.object({
    id: Joi.string().required(),
    restaurant_id: Joi.string().required(),
    name: Joi.string().required(),
    is_optional: Joi.boolean().required(),
    allow_quantity: Joi.boolean().required(),
    force_min: Joi.number().integer().required(),
    force_max: Joi.number().integer().required(),
});

const changeAddonPositionSchema = Joi.object({
    restaurant_id: Joi.string().required(),
    addonIds: Joi.array().items(Joi.string().required()).min(1).required()
});

const addChoiceSchema = Joi.object({
    addon_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().greater(0).required(),
    is_pre_selected: Joi.boolean().required(),
});

const editChoiceSchema = Joi.object({
    id: Joi.string().required(),
    addon_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().greater(0).required(),
    is_pre_selected: Joi.boolean().required(),
});

const changeChoicePositionSchema = Joi.object({
    addon_id: Joi.string().required(),
    choiceOrderedId: Joi.array().items(Joi.string().required()).min(1).required()
});

const addCategorySchema = Joi.object({
    restaurant_id: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    image: Joi.string().optional(),
    addons: Joi.array().items(Joi.string()).optional(),
});

const editCategorySchema = Joi.object({
    id: Joi.string().required(),
    restaurant_id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().optional(),
    addons: Joi.array().items(Joi.string()).optional(),
});

const changeCategoryPositionSchema = Joi.object({
    restaurant_id: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.string().required()).min(1).required()
});

const addItemSchema = Joi.object({
    category_id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().greater(0).required(),
    addons: Joi.array().items(Joi.string()).optional(),
    image: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    hide_instructions: Joi.boolean(),
    ingredients: Joi.string().optional(),
    additives: Joi.string().optional(),
    allergens: Joi.array().items(Joi.string()).optional(),
    tax_category_id: Joi.string().optional(),
    id: Joi.string().optional(),
});

const editItemSchema = Joi.object({
    id: Joi.string().required(),
    category_id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().greater(0).required(),
    addons: Joi.array().items(Joi.string()).optional(),
    image: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    hide_instructions: Joi.boolean(),
    ingredients: Joi.array().items(Joi.string()).optional(),
    additives: Joi.string().optional(),
    tax_category_id: Joi.string().optional(),
});

const changeItemPositionSchema = Joi.object({
    category_id: Joi.string().required(),
    itemIdsArray: Joi.array().items(Joi.string().required()).min(1).required()
});

const addSizeSchema = Joi.object({
    item_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().greater(0).required(),
    is_pre_select: Joi.boolean().required(),
    addons: Joi.array().items(Joi.string().required()).min(1).required(),
});

const editSizeSchema = Joi.object({
    id: Joi.string().required(),
    item_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().greater(0).required(),
    is_pre_select: Joi.boolean().required(),
    addons: Joi.array().items(Joi.string().required()).min(1).required(),
});

const addEditMenuSchema = Joi.object({
    restaurant_id: Joi.string().required(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    category_id: Joi.array().items(Joi.string()).optional(),
    id: Joi.string().optional(),
    is_active: Joi.boolean().optional(),
});

const manageAllergenSchema = Joi.object({
    menu_id: Joi.string().optional(),
    restaurant_id: Joi.string().optional(),
    name: Joi.string().required(),
    is_default: Joi.boolean().optional(),
    id: Joi.string().optional(),
});

const manageVisibilitySchema = Joi.object({
    id: Joi.string().required(),
    type: Joi.number().integer().optional(),
});

const duplicateEntitySchema = Joi.object({
    id: Joi.string().required(),
    type: Joi.number().integer().required(),
});

export const menuValidation = {
    addAddonSchema,
    editAddonSchema,
    changeAddonPositionSchema,
    addChoiceSchema,
    editChoiceSchema,
    changeChoicePositionSchema,
    addCategorySchema,
    editCategorySchema,
    changeCategoryPositionSchema,
    addItemSchema,
    editItemSchema,
    changeItemPositionSchema,
    addSizeSchema,
    editSizeSchema,
    addEditMenuSchema,
    duplicateEntitySchema,
    manageVisibilitySchema,
    manageAllergenSchema,
}