#include <iostream>

class MyClass {
    int val_ = 1;
};

struct MyStruct : MyClass {};

int main() {
    MyStruct m;
    std::cout << m.val_ << std::endl;

    return 0;
}