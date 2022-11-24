import sys
import pickle
import pandas as pd


class Predictor:
    def __init__(self, model, tf_idf) -> None:
        self.model = model
        self.vectorizer = tf_idf['vectorizer']

    def predict(self, text):
        test_df = pd.DataFrame(columns=['string'])
        test_df = pd.concat([test_df, pd.DataFrame.from_records(
            [{'string': ' '.join(text)}])], ignore_index=True)

        vectorized = self.vectorizer.transform(test_df['string'])
        y_pred = self.model.predict(vectorized)

        return y_pred[0]


# Load model
with open('toba-lake.sav', 'rb') as files:
    model = pickle.load(files)

# Load vectorizer
with open('toba-lake.tfIdf', 'rb') as files:
    tfidf = pickle.load(files)


predicter = Predictor(model, tfidf)

if __name__ == '__main__':
    if (len(sys.argv[1:]) > 1):
        results = [predicter.predict([arg]) for arg in sys.argv[1:]]
        [print(result) for result in results]
    else:
        print(predicter.predict([sys.argv[1]]))
