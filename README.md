# Custom Virtual DOM Implementation

A minimalist implementation of a Virtual DOM system with one-way data binding in pure JavaScript.

## Concept

This project demonstrates a basic yet functional implementation of a Virtual DOM, similar to what frameworks like React use. It showcases:

- Creation of a virtual DOM representation
- One-way data binding
- Efficient comparison and updating of the real DOM

## How it works

The system:
1. Maintains a virtual representation of the DOM as a data structure
2. Compares old and new Virtual DOM to detect changes
3. Updates only the parts of the real DOM that have changed

## Structure

- `createVDOM()`: Creates the virtual DOM representation
- `handle()`: Handles input changes
- `updateDOM()`: Synchronizes the real DOM with the Virtual DOM
- `convert()`: Converts virtual nodes to real DOM elements
- `findDiff()`: Compares and updates differences

## Usage Example

The current code implements a simple example where an input field automatically updates a greeting message, demonstrating one-way data binding in action. 