import npmPackageJson from '../../package.json' with { type: 'json' };

const { name, description, version, bin } = npmPackageJson;

export default Object.freeze({
  name,
  description,
  version,
  bin,
});
