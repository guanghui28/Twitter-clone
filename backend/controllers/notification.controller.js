import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
	try {
		const userId = req.user._id;

		const notifications = await Notification.find({ to: userId }).populate({
			path: "from",
			select: "username profileImg",
		});

		await Notification.updateMany({ to: userId }, { read: true });
		res.status(200).json(notifications);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
		console.log("Error in getNotifications: ", error.message);
	}
};

export const deleteNotifications = async (req, res) => {
	try {
		const userId = req.user._id;

		await Notification.deleteMany({ to: userId });

		res.status(200).json({ message: "Notifications deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
		console.log("Error in deleteNotifications: ", error.message);
	}
};

// export const deleteNotification = async (req, res) => {
// 	try {
// 		const { id: notificationId } = req.params;
// 		const userId = req.user._id;

// 		const notification = await Notification.findById(notificationId);

// 		if (!notification) {
// 			return res.status(404).json({ error: "Notification can't found" });
// 		}

// 		if (notification.to.toString() !== userId.toString()) {
// 			return res
// 				.status(401)
// 				.json({ error: "You are not allowed to delete this notification." });
// 		}

// 		await Notification.findByIdAndDelete(notificationId);
// 		res.status(200).json({ message: "Notification deleted successfully!" });
// 	} catch (error) {
// 		res.status(500).json({ error: "Internal Server Error" });
// 		console.log("Error in deleteNotifications: ", error.message);
// 	}
// };
