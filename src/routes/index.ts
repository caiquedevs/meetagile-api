import express from 'express';
import userRoutes from './user.routes';
import employeeRoutes from './employee.routes';
import hindsightRoutes from './hindsight.routes';
import actionRoutes from './actions.routes';

const allRoutes = (app: any) => {
  app.use(express.json(), express.urlencoded({ extended: false }));
  app.use(userRoutes, employeeRoutes, hindsightRoutes, actionRoutes);
};

export default allRoutes;
