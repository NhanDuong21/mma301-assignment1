export function validateProfile({ name, bio }) {
  const errors = {};
  const trimmedName = typeof name === 'string' ? name.trim() : '';

  if (trimmedName.length < 2 || trimmedName.length > 50) {
    errors.name = 'Tên phải có từ 2 đến 50 ký tự sau khi bỏ khoảng trắng ở hai đầu.';
  }

  if (typeof bio !== 'string' || bio.length > 160) {
    errors.bio = 'Giới thiệu không được vượt quá 160 ký tự.';
  }

  return errors;
}

export function isValidProfile(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    && typeof value.name === 'string' && typeof value.bio === 'string'
    && Object.keys(validateProfile(value)).length === 0;
}
