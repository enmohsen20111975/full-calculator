import { EquationCategoryData } from ".";

export const mathEquations: EquationCategoryData = {
    "Algebra & Geometry": [
        {
            name: "Pythagorean Theorem",
            equation: "a^2 + b^2 = c^2",
            variables: {
                "a": "Side a",
                "b": "Side b",
                "c": "Hypotenuse c"
            },
            description: "In a right-angled triangle, the square of the hypotenuse side is equal to the sum of squares of the other two sides."
        },
        {
            name: "Quadratic Equation",
            equation: "a*x^2 + b*x + c = 0",
            variables: {
                "x": "Solution (x)",
                "a": "Coefficient a",
                "b": "Coefficient b",
                "c": "Coefficient c"
            },
            description: "Solves for the roots of a quadratic equation of the form ax^2 + bx + c = 0."
        }
    ]
};