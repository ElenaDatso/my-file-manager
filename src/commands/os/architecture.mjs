export const archCommand = () => {
  const cpuArch = process.arch;
  console.log(
    `CPU architecture for which Node.js binary has compiled: ${cpuArch}`
  );
}
