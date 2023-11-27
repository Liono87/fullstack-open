const Notification = ({ message }) => {
  let notificationClass = 'error'; // Default class for error messages

  if (message && message.type === 'add') {
    notificationClass = 'success'; // Apply a different class for added entries
  } else if (message && message.type === 'delete') {
    notificationClass = 'deleted'; // Apply a different class for deleted entries
  } else if (message && message.type === 'updateDeleted') {
    notificationClass = 'deleted';
    // Apply a different class for attempting to update a deleted entry
  }

  if (!message) {
    return null;
  }

  return <div className={notificationClass}>{message.message}</div>;
};

export default Notification;
