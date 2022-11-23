import cors from 'cors';
import express, { Express } from 'express';
import predictsRoute from 'routes/predicts';

export default (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(cors());

  app.use(predictsRoute);
};
