const Business = require('../modals/businessModel')
const User = require('../modals/userModel')

const register = async (req, res) => {
    try {
        const { userId, businessName, businessAddress, } = req.body;

        // Check if email and username already exist
        const emailExist = await User.findOne({ email });
        const businessExist = await Business.findOne({ businessName });

        if (emailExist) {
            return res.status(400).json({ message: "User already associated with anathor business" });
        }

        if (businessExist) {
            return res.status(400).json({ message: "Name not available" });
        }

        // Create user
        const userCreated = await User.create({
            userId: userId,
            businessName,
            businessAddress,
            businessDiscription,
            BusinessCategories,
        });

        // Return success response
        return res.status(201).json({
            message: "Registration successful",
        });

    } catch (error) {
        // Internal server error
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error " });
    }
};


const uploadProfilePicture = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { email } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email && email !== user.email) {
            const existingUserWithEmail = await User.findOne({ email });
            if (existingUserWithEmail && existingUserWithEmail._id.toString() !== userId) {
                return res.status(400).json({ message: 'Email is already in use by another user' });
            }
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const profilePicture = req.file.filename.replace(/\s+/g, '-');

        // Delete old profile picture if it exists
        if (user.profilePicture) {
            const oldProfilePicturePath = `C:\\Users\\Shaktidhar gupta\\OneDrive\\Desktop\\4th-Sem\\server\\uploads\\ProfilePictures\\${user.profilePicture}`;

            if (fs.existsSync(oldProfilePicturePath)) {
                fs.unlinkSync(oldProfilePicturePath);
            }
        }

        user.profilePicture = profilePicture;
        await user.save();

        return res.status(201).json({ message: 'Profile picture uploaded successfully' });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        return res.status(500).json({ error: 'Failed to upload profile picture' });
    }
};


module.exports = { register, }