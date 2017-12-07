module.exports = {
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    transform: {
        '^.+\\.(ts|tsx)$': 'typescript-babel-jest',
    },
    testMatch: ['**/__tests__/*.(ts|tsx)'],
};
