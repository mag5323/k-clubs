$(document).ready(function(){
    var network;
    var targetNodes;
    var degrees;
    var nodeNeighbors;

    $('#submit').click(function(){
        $('table tr:gt(0)').remove();
        $('#message').empty();

        var node = parseInt($('#nodeCount').val());

        if (node > 20) {
            alert(" Too big!");
            return false;
        }

        network = draw(node);
    });

    $('#constellation').click(function(){
        constellation(network);
    });

    function draw(nodeNum) {
        var nodes = [];
        var edges = [];
        targetNodes = [];
        degrees = [];
        nodeNeighbors = [];

        for (var i = 1; i <= nodeNum; i++) {
            nodes.push({
                id: i,
                label: String(i)
            });

            for (var j = i+1; j <= nodeNum; j++) {
                if (Math.random() < 0.5) {
                    edges.push({
                        from: i,
                        to: j
                    });
                }
            }
        }

        // create a network
        var container = document.getElementById('mynetwork');
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {};
        var network =  new vis.Network(container, data, options);

        for (keys in network.nodes) {
            var degree = network.nodes[keys].dynamicEdgesLength;
            degrees.push(degree);
            $('table tr:last').after('<tr><td>' + keys + '</td> <td>'+ degree + '</td></tr>')
        }
        return network;
    }

    function constellation(network) {
        var maxDegree = 0;
        var maxKey = 0;
        var nodePool = network.nodes;

        for (keys in nodePool) {
            if (nodePool[keys].selected) {
                continue;
            }

            var neighbors = [];
            if (degrees[keys-1] > maxDegree) {
                maxDegree = degrees[keys-1];
                maxKey = keys;
            }

            for (edgeKeys in nodePool[keys].edges) {
                var node = nodePool[keys].edges[edgeKeys];
                if (parseInt(keys) === node.toId) {
                    neighbors.push(node.fromId);
                } else{
                    neighbors.push(node.toId);
                }
            }
            nodeNeighbors.push(neighbors);
        }

        if (0 === maxKey) {
            $('#message').text('All nodes have been discovered.');
            return false;
        }

        console.log(nodeNeighbors[maxKey-1]);
        targetNodes.push(maxKey);
        network.selectNodes(targetNodes);
    }
});
