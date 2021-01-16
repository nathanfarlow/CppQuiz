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

int main() {
    Object o(Object());
    return 0;
}