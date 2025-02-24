#!/bin/bash

find ./src/entities -name "*.ts" -exec sed -i.bak -E '
  /@(Column|PrimaryGeneratedColumn|OneToMany|OneToOne|ManyToOne|ManyToMany|JoinColumn|JoinTable)/ {
    :find_prop
    n

    /^[[:space:]]*$/b find_prop
    /^[[:space:]]*\/\//b find_prop

    /^{/ {
      :read_object
      n
      /^}/!b read_object
      n
    }

    s/^([[:space:]]*)([a-zA-Z_]+): ([^;]+);/\1\2!: \3;/
  }
' {} +

find ./src/entities -name "*.bak" -delete