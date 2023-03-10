import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    context = ["detail"];
    columns = [
        // { field: "NomorInputProduksi", title: "Nomor Input Produksi" },
        // { field: "Yarn.Name", title: "Yarn Name" },
        { field: "UnitDepartment.Name", title: "Unit Name" },
        {
            field: "LotDate", title: "Date", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "LotNo", title: "Lot" },
    ]

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify({ "MixDrawing": false })
        }

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.count,
                    data: result.data
                }
            });
    }

    create() {
        this.router.navigateToRoute('create');
    }

    excel() {
        this.router.navigateToRoute('excel');
    }

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

}

