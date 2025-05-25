import React from "react";
import { render, screen, userEvent, fireEvent, cleanup } from "@testing-library/react-native";
import Task from "../components/ui/task";

// Mock the TaskContext
jest.mock("~/lib/TaskContext", () => ({
  useTasks: () => ({
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  }),
}));

// Mock the PopupContext
jest.mock("~/lib/PopupContext", () => ({
  usePopup: () => ({
    showPopup: jest.fn(),
  }),
}));

describe("Task", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    cleanup();
  });

  test("renders a task", () => {
    const task = {
      id: 1,
      title: "Test Task",
      category: "Test Category",
      isChecked: false,
    };

    render(<Task task={task} />);

    // Just check if the title and category are displayed
    const titleElement = screen.getByText("Test Task");
    const categoryElement = screen.getByText("Test Category");
    expect(titleElement).toBeTruthy();
    expect(categoryElement).toBeTruthy();
  }, 10000);

  test("toggles completion status when pressed", async () => {
    const mockToggle = jest.fn();
    const task = {
      id: 1,
      title: "Test Task",
      category: "Test Category",
      isChecked: false,
    };

    render(<Task task={task} onUpdate={mockToggle} />);

    const checkbox = screen.getByTestId("checkbox");
    await fireEvent.press(checkbox);

    // Check if our mock function was called with the correct arguments
    expect(mockToggle).toHaveBeenCalledWith({
      ...task,
      isChecked: true  // The checkbox should toggle from false to true
    });
  }, 10000);

  test("toggles from checked to unchecked when pressed", async () => {
    const mockToggle = jest.fn();
    const task = {
      id: 1,
      title: "Test Task",
      category: "Test Category",
      isChecked: true, // Starting as checked
    };

    render(<Task task={task} onUpdate={mockToggle} />);

    const checkbox = screen.getByTestId("checkbox");
    await fireEvent.press(checkbox);

    // Check if our mock function was called with the correct arguments
    expect(mockToggle).toHaveBeenCalledWith({
      ...task,
      isChecked: false, // The checkbox should toggle from true to false
    });
  }, 10000);
});
