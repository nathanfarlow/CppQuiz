questions = [{"code": "#include <iostream>\n\nclass MyClass {\n    int val_ = 1;\n};\n\nstruct MyStruct : MyClass {};\n\nint main() {\n    MyStruct m;\n    std::cout << m.val_ << std::endl;\n\n    return 0;\n}", "prompt": "Welcome to the C++ quiz! (It's named the C++ quiz even though some of the peculiarities have their origins in C) Let's start easy. What does the above code print? We are using the C++ 17 standard. (If undefined, select 'Undefined behavior'. If the code would not compile, select 'Compilation error')\n", "answers": [0, 1, -1, "Undefined behavior", "Compilation error"], "correct": 4, "explanation": "This code results in a compilation error. The issue is not that a struct is inheriting from a class. It is indeed possible for C++ structs to inherit from C++ classes. In fact, the only difference between structs and classes is the fact that member variables are private by default in a class and public by default in a struct. Because val_ was private in MyClass, it will remain private in whatever class/struct inherits from it, leading to a compilation issue by trying to access it in main.\n"}, {"code": "#include <iostream>\n\nstruct Object {\n    Object() {\n        std::cout << \"A \";\n    }\n\n    Object(const Object& o) {\n        std::cout << \"B \";\n    }\n\n    Object& operator=(const Object& o) {\n        std::cout << \"C \";\n        return *this;\n    }\n};\n\nint main() {\n    Object a;\n    Object b = a;\n}", "prompt": "Let's review constructors and operators. What does the above code print?\n", "answers": ["A C", "A A C", "A B", "Undefined behavior", "Compilation error"], "correct": 2, "explanation": "The answer is A B. When declaring and initializing an object in the same statement, the copy constructor is invoked, not the assignment operator. In other words, Object b = a is the same as Object b{a}. Side note, returning a value from main is optional and defaults to returning 0. The main function is the only place this works, however. Not returning a value from any other function is undefined behavior.\n"}, {"code": "#include <iostream>\n\nstruct Object {\n    Object() {\n        std::cout << \"A \";\n    }\n\n    Object(const Object& o) {\n        std::cout << \"B \";\n    }\n\n    Object(Object&& o) {\n        std::cout << \"C \";\n    }\n};\n\nint main() {\n    Object o(Object());\n    return 0;\n}", "prompt": "Here's a tricky one. What does the above code print?\n", "answers": ["A C", "A", "Nothing", "A B B", "A B"], "correct": 2, "explanation": "Nothing is printed. Object o(Object()); is actually a forward declaration for a function that is named o which returns an Object and accepts as a parameter a function pointer that returns an Object. This is due to C++'s most vexing parse. If we wanted to create a variable, we'd have to write Object o{Object{}};\n"}, {"code": "#include <iostream>\n\nint foo(int& a) {\n    std::cout << \"bar \";\n    return a;\n}\n\nint foo(int&& a) {\n    std::cout << \"baz \";\n    return a;\n}\n\nint main(int argc, char* argv[]) {\n    return foo(foo(foo(argc)));\n}", "prompt": "What does the above code print?\n", "answers": ["bar bar bar", "baz baz bar", "bar baz baz", "Undefined behavior", "Compilation error"], "correct": 2, "explanation": "bar baz baz is printed. foo is an overloaded function. This means that the function that is called depends on which parameters the argument satisifies. The first foo function has a parameter of type lvalue reference, meaning that it will accept lvalues. Because argc is an lvalue, this will invoke the first foo function and print \"bar\". Then the return value is passed to the next foo function. The return value is an rvalue (prvalue to be exact). The second foo has a parameter of type rvalue reference. Therefore, it is chosen to be invoked and \"baz\" is printed twice.\n"}, {"code": "#include <iostream>\n\nclass Object {\npublic:\n    int a_, b_, c_;\n\n    Object(int val) : c_(val), b_(2 * c_), a_(2 * b_) {}\n};\n\nauto main() -> int {\n    Object o(2);\n    std::cout << o.a_ << std::endl;\n    return 0;\n}", "prompt": "What does the above code print?\n", "answers": [8, 0, 2, "Undefined behavior", "Compilation error"], "correct": 3, "explanation": "This code results in undefined behavior. In a C++ member initializer list, the members are initialized in the order that they appear declared in the class itself. Therefore a_(2 * b_) is invoked first, then b_(2 * c_), and finally c_(val). Because b_ is uninitialized, the value of a_ is undefined.\n"}, {"code": "#include <iostream>\n\nclass Object {\npublic:\n    int a_ = 0;\n\n    void Function() {\n        [&]() {\n            std::cout << a_++ << \" \";\n        }();\n\n        [=]() {\n            std::cout << a_++ << \" \";\n        }();\n\n        std::cout << a_ << std::endl;\n    }\n};\n\nint main() {\n\n    Object o;\n    o.Function();\n\n    return 0;\n}", "prompt": "What does the above code print?\n", "answers": ["0 0 0", "0 1 1", "0 1 2", "Undefined behavior", "Compilation error"], "correct": 2, "explanation": "The output is 0 1 2. The reason for this is because despite specifying capture by copy in the second lambda, The implicit capture of *this is always captured by reference if either = or & is specified.\n"}, {"code": "#include <iostream>\n\nstruct Object {\n\n    Object() {\n        std::cout << \"A \";\n    }\n\n    Object(const Object& o) {\n        std::cout << \"B \";\n    }\n\n    Object(Object&& o) {\n        std::cout << \"C \";\n    }\n\n};\n\ntemplate <typename T>\nvoid test(T&& param) {\n    T a = param;\n}\n\nint main() {\n    Object o;\n    test(o);\n    test(std::move(o));\n    return 0;\n}", "prompt": "This looks like previous questions but is the hardest question so far. What does the above code print?\n", "answers": ["A B C", "A B", "A C", "A C C", "Compilation error"], "correct": 1, "explanation": "The output is A B. Crazy, right? 'A' will be printed when we instantiate o. T&& is a universal reference. Let's apply the strange rules of universal references. In test(o), o is an lvalue. So by the rules of universal references, param becomes type Object& and T also becomes Object& (Weird, right?). Therefore we have Object& a = param; so no value is printed because we are just copying references! Next we have test(std::move(o)). Because std::move(o) produces an rvalue, param's type Object&& and T becomes Object. Notice how this is different from the lvalue case. Also note that Object&& is an rvalue reference, and not a universal reference. Therefore we have Object a = param. At this point we might expect the move constructor to be invoked, BUT because param is in fact an lvalue (a named rvalue reference), the copy constructor is invoked to print B! Whew.\n"}, {"code": "#include <iostream>\n\nint main() {\n    const char buf[][3][6] = {{\"abcde\", \"fghij\", \"klmno\"},\n                              {\"pqrst\", \"uvwxy\", \"z1234\"}};\n\n    std::cout << 3[2[1[0[&buf]]]] << std::endl;\n    return 0;\n}", "prompt": "This one is kind of tedious. But it's pretty interesting syntax, right? What does the above code print?\n", "answers": ["h", 3, "g", "Undefined behavior", "Compilation error"], "correct": 1, "explanation": "The output is 3. Pretty neat how these C style arrays have the property that if we have an array X and an index N, X[N] == N[X]. This is a great trick to write obfuscated C. So let's break down the expression into syntax we're familiar with: (&buf)[0][1][2][3]. Notice that (&buf)[0] == *(&buf) == buf. Then we have buf[1][2][3] and the answer becomes clear!\n"}, {"code": "#include <iostream>\n\nint main() {\n    int numbers[1000] = {1};\n    std::cout << numbers[999] << std::endl;\n    return 0;\n}", "prompt": "What does the above code print?\n", "answers": [0, 1, "Undefined behavior", "Compilation error"], "correct": 0, "explanation": "The output is 0. C++ will initialize the remaining elements of a C style array with 0 if there are not enough elements in an initializer list.\n"}, {"code": "#include <iostream>\n\nconst void other() {\n    return (void)\"A\" \"B\" \"C\";\n}\n\nvoid func() {\n    return other();\n}\n\nint main() {\n    func();\n    return 0;\n}", "prompt": "Will it compile? \ud83e\udd14\n", "answers": ["Definitely", "No, are you crazy"], "correct": 0, "explanation": "The ability to return a void from a void function is included in C++ for template consistency. C++ concatenates two string literals that are separated by a whitespace.\n"}, {"code": "#include <iostream>\n\nint main() {\n    std::cout << 1 + 1 << std::endl;\n    return 0;\n}", "prompt": "This is an easy one. Or is it? What does the above code print?\n", "answers": [2, 1, 0, "Undefined behavior", "Compilation error"], "correct": 0, "explanation": "Had to throw this one in there just to mess with you.\n"}, {"code": "#include <iostream> Hello world! :)  \ud83d\udca9 \ud83d\udc7b \ud83d\udc80 \u2620\ufe0f asdlf ???\n\nint main() {\n    std::cout << \"Hello world!\" << std::endl;\n    return 0;\n}", "prompt": "Bonus question. Technically, the above code is undefined behavior according to the spec. But will it compile under clang, gcc, and msvc?\n", "answers": ["Of course not, why would it?", "Yeah, C++ compilers are wild"], "correct": 1, "explanation": "\u00af\\_(\u30c4)_/\u00af\n"}];