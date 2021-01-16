#include <iostream>

struct Object {
    Object() {
        std::cout << "A ";
    }

    Object(const Object &o) {
        std::cout << "B ";
    }

    Object& operator=(const Object &o) {
        std::cout << "C ";
        return *this;
    }
};

int main() {
    Object a, b = a;
}