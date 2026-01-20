from math import exp
from random import uniform
import json

def normalize_age(age):
    return (age - 20) / 40

def relu(z):
    return z if z > 0 else 0

def relu_derivative(z):
    return 1 if z > 0 else 0

def sigmoid(z):
    if z < -60:
        return 0
    elif z > 60:
        return 1
    else:
        return 1 / (1 + exp(-z))
    
use_last_parameters = True

if use_last_parameters:
    with open("params.json", "r") as f:
        data = json.load(f)
        hl_weights = data['hl_weights']
        hl_biases = data['hl_biases']
        output_weights = data['output_weights']
        output_bias = data['output_bias']

    hidden_layer_neurons = 3

else:
    ages = [_ for _ in range(20, 40)] * 2 + [_ for _ in range(40, 60)] * 2
    genders = (['Female'] * 20 + ['Male'] * 20) * 2
    can_be_pregnant = ['Yes'] * 20 + ['No'] * 60

    genders = [0 if gender == 'Male' else 1 for gender in genders]
    can_be_pregnant = [0 if cbp == 'No' else 1 for cbp in can_be_pregnant]

        
    features = [ages, genders]
    len_features = len(features)

    len_data = len(ages)
    assert len(ages) == len(genders) and len(genders) == len(can_be_pregnant), \
    "Input Features & Output Targets Length Mismatch"

    hidden_layer_neurons = 3

    hl_weights = [[uniform(-0.5, 0.5) for _ in range(len_features)] for _ in range(hidden_layer_neurons)]
    hl_biases = [uniform(-0.5, 0.5) for _ in range(hidden_layer_neurons)]

    output_weights = [uniform(-0.5, 0.5) for _ in range(hidden_layer_neurons)]
    output_bias = uniform(-0.5, 0.5)

    epochs = 100_000
    learning_rate = 0.005

    for _ in range(epochs):
        delta_hl_weights = [[0 for _ in range(len_features)] for _ in range(hidden_layer_neurons)]
        delta_hl_biases = [0] * hidden_layer_neurons

        delta_out_weights = [0] * hidden_layer_neurons
        delta_out_bias = 0

        for x1, x2, y in zip(ages, genders, can_be_pregnant):

            x1_normalized = normalize_age(x1)

            hidden_preactivation_results = [0] * hidden_layer_neurons
            hidden_postactivation_results = [0] * hidden_layer_neurons

            for i in range(hidden_layer_neurons):
                preactivated_function_result = x1_normalized * hl_weights[i][0] + x2 * hl_weights[i][1] + hl_biases[i]
                hidden_preactivation_results[i] = preactivated_function_result
                hidden_postactivation_results[i] = relu(preactivated_function_result)

            z_out = output_bias
            for i in range(hidden_layer_neurons):
                z_out += output_weights[i] * hidden_postactivation_results[i]

            y_hat = sigmoid(z_out)
            y_error = y_hat - y

            for i in range(hidden_layer_neurons):
                delta_out_weights[i] += y_error * hidden_postactivation_results[i]
            delta_out_bias += y_error


            for i in range(hidden_layer_neurons):
                delta_preactivation_error = y_error * output_weights[i] * relu_derivative(hidden_preactivation_results[i])
                delta_hl_weights[i][0] += x1_normalized * delta_preactivation_error
                delta_hl_weights[i][1] += x2 * delta_preactivation_error
                delta_hl_biases[i] += delta_preactivation_error

        for i in range(hidden_layer_neurons):
            delta_hl_weights[i][0] /= len_data
            delta_hl_weights[i][1] /= len_data
            delta_hl_biases[i] /= len_data

            delta_out_weights[i] /= len_data
        delta_out_bias /= len_data

        for i in range(hidden_layer_neurons):
            hl_weights[i][0] -= learning_rate * delta_hl_weights[i][0]
            hl_weights[i][1] -= learning_rate * delta_hl_weights[i][1]
            hl_biases[i] -= learning_rate * delta_hl_biases[i]

            output_weights[i] -= learning_rate * delta_out_weights[i]
        output_bias -= learning_rate * delta_out_bias

        if _ % 10_000 == 0:
            print(
                f"\rHL W: {[[str(w1)[:7], str(w2)[:7]] for w1, w2 in hl_weights]} "
                f"HL b: {[str(b)[:7] for b in hl_biases]} "
                f"OL W: {[str(w)[:7] for w in output_weights]} "
                f"OL b: {str(output_bias)[:7]}",
                end="",
                flush=True
            )

    print()

    with open("params.json", "w") as f:
        json.dump(
            {
                "hl_weights": hl_weights,
                "hl_biases": hl_biases,
                "output_weights": output_weights,
                "output_bias": output_bias
            },
            f
        )


def predict(age, gender):
    normalized_age = normalize_age(age)

    hidden_postactivation_result = [0] * hidden_layer_neurons
    for i in range(hidden_layer_neurons):
        preactivated_function_result = hl_weights[i][0] * normalized_age + hl_weights[i][1] * gender + hl_biases[i]
        hidden_postactivation_result[i] = relu(preactivated_function_result)

    z_out = output_bias
    for i in range(hidden_layer_neurons):
        z_out += output_weights[i] * hidden_postactivation_result[i]

    return sigmoid(z_out)

test_age = 20
test_gender = 1
prediction = predict(test_age, test_gender)
print(f"Prediction: {'Yes' if prediction > 0.5 else 'No'} ({prediction})")
    

    