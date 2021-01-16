#include <iostream>

struct Object {

    Object() {
        std::cout << "A ";
    }

    Object(const Object& o) {
        std::cout << "B ";
    }

    Object(Object&& o) {
        std::cout << "C ";
    }

};

template <typename T>
void test(T&& param) {
    T a = param;
}

int main() {
    Object o;
    test(o);
    test(std::move(o));
    return 0;
}