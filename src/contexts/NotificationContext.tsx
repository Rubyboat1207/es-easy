import React, { useState, createContext, useContext, useMemo } from "react";
import { toSorted } from "../util/util";
import { Button, Paper, Typography } from "@mui/material";

interface Notification {
  text: string;
  color: string;
  btnText: string;
}

// Step 1: Define the context shape
interface NotificationContextProps {
  addNotification: (notif: Notification) => string;
  addNotifications: (notif: Notification[]) => string[];
  removeNotification: (uuid: string) => void;
}

// Create the context with an initial undefined value
const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

type NotifDict = {[uuid: string]: Notification & {order: number, uuid: string}};

// Step 2: Define the provider component
const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<NotifDict>({});
  const orderedNotifs = useMemo(() => toSorted(Object.values(notifications || {}), (a, b) => a.order - b.order), [notifications])
  
  function addNotification(notif: Notification): string {
    const uuid = crypto.randomUUID();
    const addition: NotifDict = {};
    addition[uuid] = {...notif, order: Object.keys(notifications).length, uuid};
    setNotifications(notifs => Object.assign(addition, notifs));

    return uuid;
  }

  function addNotifications(notifs: Notification[]): string[] {
    const uuids: string[] = [];
    const addition: NotifDict = {};
    for(const notif of notifs) {
      const uuid = crypto.randomUUID();
      addition[uuid] = {...notif, order: Object.keys(notifications).length, uuid};

      uuids.push(uuid);
    }
    

    setNotifications(Object.assign(addition, notifications));

    return uuids;
  }

  function removeNotification(uuid: string): void {
    const notifs = Object.assign({}, notifications);

    console.log('b', notifs)

    console.log(uuid)
    console.log(notifs[uuid])

    delete notifs[uuid];

    console.log('a', notifs)

    setNotifications(notifs);
  }

  function getColor(col: string) {
    const colors: {[key: string]: string} = {
      'ok': '#6ccc54',
      'error': '#cc5454'
    }

    if(Object.keys(colors).includes(col)) {
      return colors[col];
    }

    return col;
  }

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification, addNotifications}}
    >
      {children}
      <div className="notificationContainter">
        {orderedNotifs.map((n) => (
          <Paper elevation={2} sx={{backgroundColor: getColor(n.color)}} className="notification" key={n.uuid}>
            <Typography component={'div'} sx={{fontSize: '16px'}}>{n.text}</Typography>
            <div className="buttonContainer">
              <Button variant="contained" onClick={() => removeNotification(n.uuid)} color="secondary">{n.btnText}</Button>
            </div>
          </Paper>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// Custom hook for easy access to context
const useNotification: () => NotificationContextProps = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};

export { NotificationProvider, useNotification };
