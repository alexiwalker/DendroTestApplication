<!-- if VARA but not VARB, print b-->
<!-- if VARA and VARB, print a-->
<!-- if  not VARA, but VARC, print C-->
<!-- if  not VARA, and not VARC, print D-->

{{@if [VARA] (

    {{@if [VARB]
        (

            a

        ) else (

            b

        )
    }}


) else (


    {{@if [VARC]
        (

            c

        ) else (

            d

        )
    }}

)}}