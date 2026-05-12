function generateRandomUser(index: number) {
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const userId = String(getRandomInt(100000, 999999));
  const names = ['John Doe', 'Alice Johnson', 'Bob Smith', 'Emily Davis', 'David Lee'];
  const userName = names[getRandomInt(0, names.length - 1)];
  const email = `user${userId}@example.com`;
  const status = Math.random() < 0.5 ? 'active' : 'inactive';
  const categoryName = 'Ac';
  const categoryDesc = 'Ac Gas Fiting';
  const numberservice = '10';

  return {
    rowId: index + 1,
    userId,
    userName,
    email,
    status,
    categoryName,
    categoryDesc,
    numberservice
  };
}

export const usersManagementData = Array?.from({ length: 100 }, (_, index) =>
  generateRandomUser(index)
);
