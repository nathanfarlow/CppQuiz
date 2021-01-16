#include <iostream>

class Object {
public:
    int a_ = 0;

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