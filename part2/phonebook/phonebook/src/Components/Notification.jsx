import React from "react";

const Notification = ({ notification }) => {
	if (!notification) {
		return null;
	}

	const { type, message } = notification;

	return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
