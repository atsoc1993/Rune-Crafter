import math
from random import uniform

ages = [_ for _ in range(20, 50)] * 2 + [_ for _ in range(50, 80)] * 2
genders = (['Female'] * 30 + ['Male'] * 30) * 2
cbps = ['Yes'] * 30 + ['No'] * 90

genders = [0 if gender == 'Male' else 1 for gender in genders]
cbps = [0 if cbp == 'No' else 1 for cbp in cbps]

assert len(ages) == len(genders) and len(genders) == len(cbps)
len_data = len(ages)

learning_rate = 0.01
epochs = 10_000

def normalize_age(age: int) -> float:
    return (age - 20) / 60

def sigmoid(z):
    if z < -60:
        return 0
    elif z > 60:
        return 1
    else:
        return 1 / (1 + math.exp(-z))

def relu(num):
    return num if num > 0 else 0

def relu_derivative(num):
    return 1 if num > 0 else 0

features = [ages, genders]

hidden_layer_neurons = 3
hidden_layer_weights = [[uniform(-.5, .5) for _ in range(len(features))] for _ in range(hidden_layer_neurons)]
hidden_layer_biases = [uniform(-.5, .5) for _ in range(hidden_layer_neurons)]

output_layer_weights = [uniform(-.5, .5) for _ in range(hidden_layer_neurons)]
output_layer_bias = uniform(-.5, .5)

epochs = 10_000
learning_rate = 0.01

for _ in range(epochs):
    delta_hidden_layer_weights = [[0 for _ in range(len(features))] for _ in range(hidden_layer_neurons)]
    delta_hidden_layer_biases = [0 for _ in range(hidden_layer_neurons)]

    delta_output_layer_weights = [0 for _ in range(hidden_layer_neurons)]
    delta_output_layer_bias = 0


    for x1, x2, y in zip(ages, genders, cbps):
        x1n = normalize_age(x1)

        hidden_layer_preactivation_values = [0 for _ in range(len(hidden_layer_weights))]
        hidden_layer_postactivation_values = [0 for _ in range(len(hidden_layer_weights))]

        for i in range(len(hidden_layer_weights)):
            preactivation_value = hidden_layer_weights[i][0] * x1n + hidden_layer_weights[i][1] * x2 + hidden_layer_biases[i]
            hidden_layer_preactivation_values[i] = preactivation_value
            hidden_layer_postactivation_values[i] = relu(preactivation_value)

        z_out = output_layer_bias
        for i in range(len(hidden_layer_postactivation_values)):
            z_out += output_layer_weights[i] * hidden_layer_postactivation_values[i]

        y_hat = sigmoid(z_out)
        y_error = y_hat - y

        for i in range(len(output_layer_weights)):
            delta_output_layer_weights[i] += hidden_layer_postactivation_values[i] * y_error
        delta_output_layer_bias += y_error

        for i in range(hidden_layer_neurons):
            delta_hidden_layer_error = y_error * output_layer_weights[i] * relu_derivative(hidden_layer_preactivation_values[i])
            delta_hidden_layer_weights[i][0] += delta_hidden_layer_error * x1n
            delta_hidden_layer_weights[i][1] += delta_hidden_layer_error * x2
            delta_hidden_layer_biases[i] += delta_hidden_layer_error

    for i in range(hidden_layer_neurons):
        delta_hidden_layer_weights[i][0] /= len_data
        delta_hidden_layer_weights[i][1] /= len_data
        delta_hidden_layer_biases[i] /= len_data

        delta_output_layer_weights[i] /= len_data
    delta_output_layer_bias /= len_data

    for i in range(hidden_layer_neurons):
        hidden_layer_weights[i][0] -= learning_rate * delta_hidden_layer_weights[i][0]
        hidden_layer_weights[i][1] -= learning_rate * delta_hidden_layer_weights[i][1]
        hidden_layer_biases[i] -= learning_rate * delta_hidden_layer_biases[i]
        
        output_layer_weights[i] -= learning_rate * delta_output_layer_weights[i]
    output_layer_bias -= learning_rate * delta_output_layer_bias

        
def predict(age, gender):

    age_normalized = normalize_age(age)
    hidden_layer_postactivation_values = [0 for _ in range(hidden_layer_neurons)]

    for i in range(hidden_layer_neurons):
        preactivation_value = hidden_layer_weights[i][0] * age_normalized + hidden_layer_weights[i][1] * gender + hidden_layer_biases[i]
        hidden_layer_postactivation_values[i] = relu(preactivation_value)

    z_out = output_layer_bias
    for i in range(len(hidden_layer_postactivation_values)):
        z_out += output_layer_weights[i] * hidden_layer_postactivation_values[i]

    y_prediction = sigmoid(z_out)

    return y_prediction

test_age = 60
test_gender = 0
print(predict(test_age, test_gender))