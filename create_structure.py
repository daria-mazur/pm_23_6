import os


def create_structure_for_gulp():
    main_folders = ["app", "node_modules"]
    folders_in_app = ["app/css", "app/fonts", "app/img", "app/js", "app/sass"]
    files = ["gulpfile.js", "package.json", "app/index.html"]

    for fn in main_folders + folders_in_app:
        try:
            os.mkdir(fn)
        except OSError:
            print(f"Folder {fn} found.")

    for fn in files:
        with open(f"{fn}", "w") as _:
            pass


create_structure_for_gulp()
