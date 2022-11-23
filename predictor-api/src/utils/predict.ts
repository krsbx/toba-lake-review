import path from 'path';
import { PythonShell } from 'python-shell';
import { ROOT_PATH } from './constant';

export const predict = <Result extends TLR.PredictionResult>(
  reviews: string[]
): Promise<undefined | Result[]> =>
  new Promise((resolve, reject) => {
    PythonShell.run(
      path.join(ROOT_PATH, '/bin/predict.py'),
      {
        args: reviews,
        cwd: path.join(ROOT_PATH, '/bin'),
      },
      (err, output) => {
        if (err) {
          reject(err);
          return;
        }

        if (!output) {
          resolve(undefined);
          return;
        }

        if (typeof output[0] === 'string') {
          if (reviews.length === 1) {
            resolve([output[0].replace(/'/g, '')] as unknown as Result[]);
            return;
          }

          resolve(
            output[0]
              .replace(/'/g, '')
              .slice(1, [].length - 1)
              .split(',')
              .map(($1) => $1.replace(' ', '')) as Result[]
          );
          return;
        }

        resolve(output);
      }
    );
  });
