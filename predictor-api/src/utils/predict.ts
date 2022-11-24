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

        if (Array.isArray(output)) {
          resolve(output);
          return;
        }

        resolve([output]);
      }
    );
  });
