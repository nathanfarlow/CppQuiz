#include <iostream>

int foo(int& a) {
    std::cout << "bar ";
    return a;
}

int foo(int&& a) {
    std::cout << "baz ";
    return a;
}

int main(int argc, char* argv[]) {
    return foo(foo(foo(argc)));
}