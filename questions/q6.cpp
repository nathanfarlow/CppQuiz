#include <iostream>

class Object {
    int a_ = 0;

public:

    void Function() {
        [&]() {
            std::cout << a_++ << " ";
        }();

        [=]() {
            std::cout << a_++ << " ";
        }();

        std::cout << a_ << std::endl;
    }
};

int main() {

    Object o;
    o.Function();

    return 0;
}