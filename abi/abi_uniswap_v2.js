module.exports = {
    factory: ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'],
    router: [
        'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
        'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
        'function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
        'function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline) external  payable returns (uint[] memory amounts)'
    ]
};