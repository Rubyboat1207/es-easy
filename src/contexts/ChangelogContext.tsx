import React, { useState, createContext, useContext } from 'react';
import { CourseChange } from '../components/Rotationcard';
import { Course, ScheduleView } from '../types';

// Step 1: Define the context shape
interface ChangelogContextProps {
    changes: CourseChange[],
    setChanges: React.Dispatch<React.SetStateAction<CourseChange[]>>
    courses: (ScheduleView | null)[]
}

// Create the context with an initial undefined value
const CourseContext = createContext<ChangelogContextProps | undefined>(undefined);

// Step 2: Define the provider component
const CourseContextProvider: React.FC<{children: React.ReactNode, changes: CourseChange[], setChanges: React.Dispatch<React.SetStateAction<CourseChange[]>>, courses: (ScheduleView | null)[]}> = ({ children, changes, setChanges, courses }) => {

    return (
        <CourseContext.Provider value={{ changes, setChanges, courses }}>
            {children}
        </CourseContext.Provider>
    );
};

// Custom hook for easy access to context
const useCourseContextProvider: () => ChangelogContextProps = () => {
    const context = useContext(CourseContext);
    if (!context) {
        throw new Error('useLogin must be used within a LoginProvider');
    }
    return context;
};

export { CourseContextProvider, useCourseContextProvider };
