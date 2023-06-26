def possible(odds_1, odds_2):
    # Calculate the inverse of the decimal odds
    inverse_odds_1 = 1 / odds_1[0]
    inverse_odds_2 = 1 / odds_2[1]
    
    # Calculate the sum of inverse odds
    total_inverse_odds = inverse_odds_1 + inverse_odds_2
    
    return total_inverse_odds < 1

def profit(odds_1, odds_2, stake1):
    range = ((stake1/(odds_2[1]-1)), stake1*(odds_1[0] - 1))
    avg = (range[0] + range [1])/2
    invest = stake1 + avg
    profit1 = (stake1*odds_1[0]) - invest 
    profit2 = (avg*odds_2[1]) - invest 
    print("with {:.2f} on odd1 and {:.2f} on odd 2, you can profit {:.2f} or {:.2f} ~ {:.2f}% or {:.2f}% ".format(stake1, avg, profit1 , profit2, profit1/invest*100,  profit2/invest*100 ))



def profit2(odds_1, odds_2, stake1):
    range = ((stake1/(odds_2[1]-1)), stake1*(odds_1[0] - 1))
    avg = range[0] + 0.1 
    invest = stake1 + avg
    profit1 = (stake1*odds_1[0]) - invest 
    profit2 = (avg*odds_2[1]) - invest 
    print("with {:.2f} on odd1 and {:.2f} on odd 2, you can profit {:.2f} or {:.2f} ~ {:.2f}% or {:.2f}%".format(stake1, avg, profit1 , profit2,  profit1/invest*100,  profit2/invest*100 ))


def check(odds_1, odds_2, stake1):
    print("-----------------option1----------------------")
    print(str(odds_1[0]) + ";" + str(odds_2[1]))
    if possible(odds_1, odds_2):
        profit(odds_1, odds_2, stake1)
        profit2(odds_1, odds_2, stake1)
    print("-----------------invert----------------------")
    print(str(odds_2[0]) + ";" + str(odds_1[1]))
    if possible(odds_2, odds_1):
        profit(odds_2, odds_1, stake1)
        profit2(odds_2, odds_1, stake1)

# Example usage
odds_tuple_1 = (2.11, 1.65)
odds_tuple_2 = (3.25, 1.33)
stake_amount = 100  

check(odds_tuple_1, odds_tuple_2, stake_amount)

