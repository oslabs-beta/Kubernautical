// import fs from "fs";
// import path from "path";
// import Request from "supertest";
// import assert from "assert";
// import { exec, ChildProcess } from 'child_process';
import { expect } from '@jest/globals'; // Import expect from Jest
import supertest from 'supertest';
import express from 'express';


const app = express(); // Replace with your Express app
const request = supertest(app);


describe("Error catch route", () => {
  it("should respond with a 404 error", async () => {
    const response = await request.get("/wrongaddress");
    expect(response.status).toBe(404);
  });
});



// const server = "http://localhost:3001";
// let serverProcess: ChildProcess;

// beforeAll(async () => {
//   console.log('Starting the server...');
//   const startServer = 'npm run serve:dev';
//   serverProcess = exec(startServer);
//   await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for the server to start (adjust the delay as needed)
// });

// afterAll(() => {
//   console.log('Stopping the server...');
//   serverProcess.kill(); // Terminate the server process (you may need to customize this logic to gracefully stop your server)
// });

