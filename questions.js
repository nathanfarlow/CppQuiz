questions = [{"code": "#include <iostream>\n\nclass MyClass {\n    int val_ = 1;\n};\n\nstruct MyStruct : MyClass {};\n\nint main() {\n    MyStruct m;\n    std::cout << m.val_ << std::endl;\n\n    return 0;\n}", "prompt": "Welcome to the C++ quiz! (Although some of the peculiarities have their origins in C) Let's start easy. What does the above code print? We are using the C++ 17 standard. (If undefined, select 'Undefined behavior'. If the code would not compile, select 'Compilation error')\n", "answers": [0, 1, -1, "Undefined behavior", "Compilation error"], "correct": 4, "explanation": "It is possible for C++ structs to inherit from C++ classes. In fact, the only difference between structs and classes is the fact that member variables are private by default in a class and public by default in a struct. Because val_ was private in MyClass, it will remain private in whatever class/struct inherits from it, leading to a compilation issue by trying to access it in main.\n"}, {"code": "#include <iostream>\n\nstruct Object {\n    Object() {\n        std::cout << \"A \";\n    }\n\n    Object(const Object& o) {\n        std::cout << \"B \";\n    }\n\n    Object& operator=(const Object& o) {\n        std::cout << \"C \";\n        return *this;\n    }\n};\n\nint main() {\n    Object a;\n    Object b = a;\n}", "prompt": "Let's review constructors and operators. What does the above code print?\n", "answers": ["A C", "A A C", "A B", "Undefined behavior", "Compilation error"], "correct": 2, "explanation": "When declaring and initializing an object in the same statement, the copy constructor is invoked, not the assignment operator. In other words, Object b = a is the same as Object b{a}. Also, returning a value from main is optional and defaults to returning 0. main is the exception, however. Not returning a value from any other function is undefined behavior.\n"}, {"code": "#include <iostream>\n\nstruct Object {\n    Object() {\n        std::cout << \"A \";\n    }\n\n    Object(const Object& o) {\n        std::cout << \"B \";\n    }\n\n    Object(Object&& o) {\n        std::cout << \"C \";\n    }\n};\n\nint main() {\n    Object o(Object());\n    return 0;\n}", "prompt": "Here's a tricky one. What does the above code print?\n", "answers": ["A A C", "A", "Nothing", "Undefined behavior", "A A B"], "correct": 2, "explanation": "Nothing is printed. Object o(Object()) is actually a forward declaration for a function that is named o, returns an Object and accepts a function pointer that returns an Object as a parameter. This is due to C++'s most vexing parse. If we wanted to create a variable, we'd have to write Object o{Object{}};\n"}, {"code": "#include <iostream>\n\nint foo(int& a) {\n    std::cout << \"bar \";\n    return a;\n}\n\nint foo(int&& a) {\n    std::cout << \"baz \";\n    return a;\n}\n\nint main(int argc, char* argv[]) {\n    return foo(foo(foo(argc)));\n}", "prompt": "What does the above code print? (Bonus question: foo, bar, baz, what comes next?)\n", "answers": ["bar bar bar", "baz baz bar", "bar baz baz", "Undefined behavior", "Compilation error"], "correct": 2, "explanation": "foo is an overloaded function. This means that the function that is called depends on which parameters the argument satisifies. The first foo function has a parameter of type lvalue reference, meaning that it will accept lvalues. Because argc is an lvalue, this will invoke the first foo function and print \"bar\". Then the return value is passed to the next foo function. The return value is an rvalue (prvalue to be exact). The second foo takes an rvalue reference, Therefore, \"baz\" is printed twice."}];