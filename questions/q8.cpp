#include <iostream>

int main() {
    const char buf[][3][6] = {{"abcde", "fghij", "klmno"},
                              {"pqrst", "uvwxy", "z1234"}};

    std::cout << 3[2[1[0[&buf]]]] << std::endl;
    return 0;
}