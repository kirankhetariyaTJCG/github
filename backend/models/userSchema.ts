import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// User Interface for TypeScript with additional methods
export interface IUser extends Document {
    profile_image: string;
    first_name: string;
    last_name: string;
    email: string;
    is_deleted: boolean;
    email_change_token: string | null;
    email_change_expire: Date | null;
    is_email_verified: boolean;
    email_verification_code: string | null;
    email_verification_expire: Date | null;
    password: string;
    reset_password_token?: string | null;
    reset_password_expire?: Date | null;
    website?: string | null;
    user_permission?: Object | null;
    is_active: boolean;
    changeEmail(newEmail: string): Promise<void>;
    comparePassword(password: string): Promise<boolean>;
    generateJWTToken(): string;
    generateResetPasswordToken(): string;
    generateEmailChangeToken(): string;
    generateEmailVerificationCode(): string;

    role: 'owner' | 'manager' | 'reseller';
    user_type: number; // 1.MANAGER, 2.RESELLER, 3.OWNER, 4.SUPER_ADMIN, 5.CUSTOMER
    restaurant_ids: string[]
    permissions: string;
}

const userSchema = new Schema<IUser>(
    {
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
            select: false
        },
        is_email_verified: {
            type: Boolean,
            default: false,
        },
        profile_image: {
            type: String,
            default: null,
        },
        email_change_token: {
            type: String,
            default: null,
            select: false
        },
        email_change_expire: {
            type: Date,
            default: null,
        },
        email_verification_code: {
            type: String,
            default: null,
            select: false
        },
        email_verification_expire: {
            type: Date,
            default: null,
        },
        reset_password_token: {
            type: String,
            default: null,
            select: false
        },
        reset_password_expire: {
            type: Date,
            default: null,
        },
        role: {
            type: String,
            // enum: ['owner', 'manager', 'reseller'],
            default: 'manager',
        },
        user_type: {
            type: Number,
            default: 5
        },
        restaurant_ids: {
            type: [String], // Assuming this field holds an array of restaurant IDs
        },
        website: {
            type: String,
            default: null
        },
        user_permission: {
            type: Object,
            default: {}
        },
        is_active: {
            type: Boolean,
            default: true
        },
        is_deleted: {
            type: Boolean,
            default: false
        },
        permissions: [String]
    },
    { timestamps: true }
);

userSchema.index({ email: 1 });
userSchema.index({ is_deleted: 1 });
userSchema.index({ first_name: 1, last_name: 1 });

// Middleware to hash password before saving if modified
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate a password reset token
userSchema.methods.generateResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash and set reset_password_token field
    this.reset_password_token = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Set token expiration (15 minutes)
    this.reset_password_expire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

// Method to generate email change token
userSchema.methods.generateEmailChangeToken = function () {
    const changeToken = crypto.randomBytes(20).toString("hex");

    // Hash and set email_change_token field
    this.email_change_token = crypto
        .createHash("sha256")
        .update(changeToken)
        .digest("hex");

    // Set token expiration (15 minutes)
    this.email_change_expire = Date.now() + 15 * 60 * 1000;

    return changeToken;
};

// Method to generate email verification code
userSchema.methods.generateEmailVerificationCode = function () {
    const verificationCode = crypto.randomBytes(20).toString("hex");

    // Hash and set email_verification_code field
    this.email_verification_code = crypto
        .createHash("sha256")
        .update(verificationCode)
        .digest("hex");

    // Set verification code expiration (15 minutes)
    this.email_verification_expire = Date.now() + 15 * 60 * 1000;

    return verificationCode;
};

// Method to change user email
userSchema.methods.changeEmail = async function (newEmail: string) {
    this.email = newEmail;
    await this.save();
};

// Create and export the User model
const User: Model<IUser> = mongoose.model<IUser>("user", userSchema);
export default User;
