#include <iostream>

class Object {
public:
    int a_;
    int b_;
    int c_;

    Object(int val) : c_(val), b_(2 * c_), a_(2 * b_) {}
};

auto main() -> int {
    Object o(2);
    std::cout << o.a_ << std::endl;
    return 0;
}