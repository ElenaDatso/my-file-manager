import os from 'os';

export const cpusCommand = () => {
  const cpus = os.cpus();
  console.log(`Overall amount of CPUs: ${cpus.length}`);

  cpus.forEach((cpu, index) => {
    const speedInGHz = cpu.speed / 1000;
    console.log(`CPU #${index + 1}: Model - ${cpu.model}, Clock Rate - ${speedInGHz.toFixed(2)} GHz`);
  });
}

