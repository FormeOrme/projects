function fact(n) {
    return n ? n * fact(n - 1) : 1;
}