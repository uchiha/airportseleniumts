// main entry point for defining grunt tasks

module.exports = function(grunt){
    grunt.initConfig({
        cucumberjs : {
            options : {
                format : 'html',
                output : 'target/my_reports.html',
                theme : 'bootstrap',
                require : 'target/step_definitions',
                tags: grunt.option('cucumbertags')
            },
            features : ['src/features']
        },
        ts : {
            default : {
                // won't use tsconfig due to issue with grunt
                src : ["src/**/*.ts"],
                outDir : "target",
                options : {
                    target : "es6",
                    module : "commonjs",
                    strict : true,
                    strictPropertyInitialization : false,
                    esModuleInterop : true
                },
                exclude : [
                    "node_modules"
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-cucumberjs');
    grunt.loadNpmTasks('grunt-ts');
    grunt.registerTask('default', ['ts', 'cucumberjs']);
};