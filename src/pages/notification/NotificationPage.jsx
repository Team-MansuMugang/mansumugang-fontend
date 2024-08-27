import { useEffect, useState } from 'react';
import MainHeader from '../../components/MainHeader';
import NavBar from '../../components/NavBar';
import NotificationItem from '../../components/NotificationItem';
import './NotificationPage.css';

const NotificationPage = () => {
  const [notifications, setNotificaitons] = useState([]);

  useEffect(() => {
    const openDatabase = () => {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open('firebaseNotificationsDB', 1);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('notifications')) {
            db.createObjectStore('notifications', { keyPath: 'id', autoIncrement: true });
          }
        };

        request.onsuccess = (event) => {
          resolve(event.target.result);
        };

        request.onerror = (event) => {
          reject('Database error: ' + event.target.errorCode);
        };
      });
    };

    const fetchData = async () => {
      try {
        const db = await openDatabase();
        const transaction = db.transaction('notifications', 'readonly');
        const objectStore = transaction.objectStore('notifications');

        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = (event) => {
          const notifications = event.target.result;
          const sortedNotifications = notifications.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });

          setNotificaitons(sortedNotifications);
        };

        getAllRequest.onerror = (event) => {
          console.error('Fetch error: ' + event.target.errorCode);
        };
      } catch (error) {
        console.error('Database open error: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="notification-page">
      <NavBar activeTab="알람"></NavBar>
      <MainHeader isLeftButtonEnable={false} title={'알림'} />
      {notifications.map((notification, index) => (
        <NotificationItem
          key={index}
          title={notification.title}
          body={notification.body}
          timeAgo={notification.createdAt}
        />
      ))}
    </div>
  );
};

export default NotificationPage;
