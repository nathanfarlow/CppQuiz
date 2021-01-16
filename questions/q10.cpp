#include <iostream>

const void other() {
    return (void)"A" "B" "C";
}

void func() {
    return other();
}

int main() {
    func();
    return 0;
}