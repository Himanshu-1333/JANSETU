import { Worker } from '@temporalio/worker';

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows/hello'),
    activities: {
      // activities are loaded from the activities module
      ...require('./activities'),
    },
    taskQueue: 'jansetu',
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
