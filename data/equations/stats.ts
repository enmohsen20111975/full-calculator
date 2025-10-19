import { EquationCategoryData } from ".";

export const statsEquations: EquationCategoryData = {
    "Basic Probability": [
        {
            name: "Probability of an Event",
            equation: "P_A = FavorableOutcomes / TotalOutcomes",
            variables: {
                "P_A": "Probability of Event A",
                "FavorableOutcomes": "Number of Favorable Outcomes",
                "TotalOutcomes": "Total Number of Outcomes"
            },
            description: "Calculates the likelihood of a single event occurring."
        }
    ],
    "Descriptive Statistics": [
        {
            name: "Mean (Average)",
            equation: "mean = sum / count",
            variables: {
                "mean": "Mean",
                "sum": "Sum of all values",
                "count": "Number of values"
            },
            description: "The central tendency of a finite set of numbers: the sum of the values divided by the number of values."
        }
    ],
    "Combinatorics": [
        {
            name: "Permutations",
            equation: "P_n_k = n! / (n - k)!",
            variables: {
                "P_n_k": "Permutations",
                "n": "Total items (n)",
                "k": "Items to choose (k)"
            },
            description: "The number of ways to choose a sample of k elements from a set of n, where order matters."
        },
        {
            name: "Combinations",
            equation: "C_n_k = n! / (k! * (n - k)!)",
            variables: {
                "C_n_k": "Combinations",
                "n": "Total items (n)",
                "k": "Items to choose (k)"
            },
            description: "The number of ways to choose a sample of k elements from a set of n, where order does not matter."
        }
    ]
};