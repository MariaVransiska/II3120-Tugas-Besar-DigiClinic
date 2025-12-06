let notifications = [
    { id: 1, message: 'Paracetamol stock is low', read: false }
];

exports.getNotifications = (req, res) => {
    res.status(200).json(notifications);
};

exports.closeNotification = (req, res) => {
    const { id } = req.body;
    notifications = notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
    );
    res.status(200).json({ message: 'Notification closed', notifications });
};